"use client";

import Image from "next/image";
import IconDice from "../../../public/images/icon-dice.svg";
import DividerMobile from "../../../public/images/pattern-divider-mobile.svg";
import DividerDesktop from "../../../public/images/pattern-divider-desktop.svg";
import { useFetch } from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Slip = {
  slip: {
    id: number | undefined;
    advice: string | undefined;
  };
};

type Message = {
  message: {
    type: string | undefined;
    text: string | undefined;
  };
};

export default function AdviceSlip() {
  const [slip, error, trigger, setTrigger] = useFetch<Slip, Message>(
    "https://api.adviceslip.com/advice",
  );
  if (slip.slip) {
    return (
      <section className="bg-neutral-dgBlue text-center relative grid gap-8 place-items-center px-8 pt-8 pb-16 rounded-xl max-w-[60ch] font-extrabold">
        {slip.slip.id && (
          <h1 className="text-primary-green text-xs tracking-[0.35em]">
            ADVICE #<span>{slip.slip?.id}</span>
          </h1>
        )}
        <p className="text-primary-cyan text-[28px] leading-8">{`"${slip.slip?.advice}"`}</p>
        <Image src={DividerMobile} alt="" className="md:hidden" />
        <Image src={DividerDesktop} alt="" className="hidden md:block" />
        <div
          onClick={() => setTrigger(!trigger)}
          className="grid justify-center w-fit h-fit absolute bottom-0 translate-y-1/2 rounded-full p-4 cursor-pointer hover:shadow-[10px_10px_15px_-9px,_-10px_-10px_15px_-9px,10px_-10px_15px_-9px,_-10px_10px_15px_-9px] hover:shadow-primary-green bg-primary-green"
        >
          <Image src={IconDice} alt="" />
        </div>
      </section>
    );
  } else if (error.message) {
    toast.error(error.message.text, {
      action: {
        label: "Retry",
        onClick: () => setTrigger(!trigger),
      },
    });
  } else {
    return <Skeleton className="w-full h-1/2 rounded-xl bg-neutral-dgBlue" />;
  }
}

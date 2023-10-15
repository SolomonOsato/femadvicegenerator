import { useEffect, useState } from "react";
export function useFetch<T, E>(
  url: string,
): [T, E, boolean, (state: boolean) => void] {
  const [returnData, setReturnData] = useState<T>({} as T);
  const [returnError, setReturnError] = useState<E>({} as E)
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = res.json();
      data
        .then((data) => {
          setReturnData(data);
        })
        .catch((error) => {
			setReturnError(error)
        });
    }

    fetchData();
  }, [url, trigger]);

  return [returnData, returnError, trigger, setTrigger];
}

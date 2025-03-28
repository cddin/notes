import { useState } from "react";

export function useFetch<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const result = await res.json();
        setData(result);
    } catch (err: any) {
       setError(err);
    } finally {
       setLoading(false);
    }
  };

  return { data, loading, error , fetchData};
}
import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(url, {
          signal: abortController.signal,
          ...options,
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        if (!ignore) {
          setData(json);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
      ignore = true;
    };
  }, [url, options]);

  return { data, loading, error };
}

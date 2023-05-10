import { useEffect, useState } from "react";

type MoviesType = {
  id: string;
  title: string;
  description: string;

  thumbnail: {
    data: Buffer;
  };
}[];

type UseFetchProps = {
  loading: boolean;
  data: MoviesType;
  error: string | null;
};

export function useFetch(url: string): UseFetchProps {
  const [state, setState] = useState<{
    loading: boolean;
    data: MoviesType;
    error: string | null;
  }>({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((res) => res.json())
      .then((data) => {
        setState({ ...state, loading: false, data });
      })
      .catch((err) => {
        setState({ ...state, error: err });
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return state;
}

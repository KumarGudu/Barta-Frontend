import useSWR from "swr";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { useEffect, useState } from "react";

type FetchDataOptions = {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  shouldRetryOnError?: boolean;
};

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      withCredentials: true,
      headers: {
        "x-access-token": token,
      },
    })
    .then((res) => res?.data?.data);

export const useFetchData = <T>(url: string, options?: FetchDataOptions) => {
  const mainUrl = `${BASE_URL}${url}`;
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken ? JSON.parse(storedToken) : null);
  }, []);
  const { data, error, isLoading, mutate } = useSWR<T>(
    mainUrl,
    ([url, token]) => fetcher(url, token),
    {
      revalidateOnFocus: options?.revalidateOnFocus ?? true,
      revalidateOnReconnect: options?.revalidateOnReconnect ?? true,
      shouldRetryOnError: options?.shouldRetryOnError ?? true,
    }
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate, // This allows you to manually trigger a re-fetch or update the cache
  };
};

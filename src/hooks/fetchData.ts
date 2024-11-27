import useSWR from "swr";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { useEffect, useState } from "react";

type FetchDataOptions = {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  shouldRetryOnError?: boolean;
};

const fetcher = (url: string, token: string | null) => {
  if (!token) return Promise.reject(new Error("No token available"));
  return axios
    .get(url, {
      withCredentials: true,
      headers: {
        "x-access-token": token,
      },
    })
    .then((res) => res?.data?.data);
};

export const useFetchData = <T>(url: string, options?: FetchDataOptions) => {
  const mainUrl = `${BASE_URL}${url}`;
  const [token, setToken] = useState<string | null>(null);

  // Fetch token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken ? JSON.parse(storedToken) : null);
  }, []);

  // SWR key includes both URL and token
  const { data, error, isLoading, mutate } = useSWR<T>(
    token ? [mainUrl, token] : null, // If token is null, no request is made
    ([url, token]) => fetcher(url, token as any), // Pass both arguments to the fetcher
    {
      revalidateOnFocus: options?.revalidateOnFocus ?? true,
      revalidateOnReconnect: options?.revalidateOnReconnect ?? true,
      shouldRetryOnError: options?.shouldRetryOnError ?? true,
    }
  );

  return {
    data,
    error,
    isLoading: !data && !error,
    mutate,
  };
};

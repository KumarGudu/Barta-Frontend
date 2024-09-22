import useSWR from "swr";
import axios from "axios";
import { BASE_URL } from "@/utils";

type FetchDataOptions = {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  shouldRetryOnError?: boolean;
};

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res?.data?.data);

export const useFetchData = <T>(url: string, options?: FetchDataOptions) => {
  const mainUrl = `${BASE_URL}${url}`;
  const { data, error, isLoading, mutate } = useSWR<T>(mainUrl, fetcher, {
    revalidateOnFocus: options?.revalidateOnFocus ?? true,
    revalidateOnReconnect: options?.revalidateOnReconnect ?? true,
    shouldRetryOnError: options?.shouldRetryOnError ?? true,
  });

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate, // This allows you to manually trigger a re-fetch or update the cache
  };
};

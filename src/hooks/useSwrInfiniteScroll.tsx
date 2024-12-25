import { BASE_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

interface UseSwrInfiniteScrollProps<T> {
  url: string;
  perPage: number;
  searchStr: string;
  options?: any; // You can further type this based on SWR options if needed
}

export const useSwrInfiniteScroll = <T,>({
  url,
  perPage,
  options,
  searchStr,
}: UseSwrInfiniteScrollProps<T>) => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const fetcher = (url: string): any => {
    const token = JSON.parse(localStorage.getItem("token"));
    return axiosInstance
      .get(url, {
        headers: {
          "x-access-token": token || "",
        },
      })
      .then((res) => res?.data?.data);
  };

  const getKey = (pageIndex: number, previousPageData: T[] | null) => {
    if (pageIndex === 0)
      return `${BASE_URL}${url}?pageNo=1&perPage=${perPage}&searchStr=${searchStr}`;
    if (previousPageData && previousPageData.length === 0) {
      return null;
    }
    return `${BASE_URL}${url}?pageNo=${
      pageIndex + 1
    }&perPage=${perPage}&searchStr=${searchStr}`;
  };

  const { data, size, setSize, isValidating, error, mutate } = useSWRInfinite<
    T[]
  >(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const convertedData = data?.flat();

  const isReachedEnd = data && data[data.length - 1]?.length < perPage;
  const loadingMore = !data || data[size - 1] === undefined;

  return {
    convertedData,
    size,
    setSize,
    isValidating,
    error,
    mutate,
    isReachedEnd,
    loadingMore,
  };
};

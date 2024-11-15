import { BASE_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

type InfiniteScrollType<T> = {
  query?: string;
  isOpen?: boolean;
  pageNumber: number;
  url: string;
  data?: T[];
  setData?: (users: Partial<T>[]) => void;
  extParams?: any;
  reset?: boolean;
};

function useInfiniteScroll<T>({
  query,
  isOpen,
  pageNumber,
  url,
  setData,
  extParams,
  reset,
}: InfiniteScrollType<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [resData, setResData] = useState<T[]>([]);

  useEffect(() => {
    if (reset) {
      setResData([]);
    }
  }, [reset, query]);

  const fetchData = (page: number = pageNumber) => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${BASE_URL}${url}`,
      params: {
        pageNo: page,
        perPage: 15,
        searchStr: query,
        ...extParams,
      },
      withCredentials: true,
    })
      .then((res) => {
        const newData: T[] = res?.data?.data;
        if (setData) setData(newData);
        setResData((prevData) => [
          ...(reset || page === 1 ? [] : prevData),
          ...newData,
        ]);
        setHasMore(newData.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        if (axios.isCancel(err)) return;
        setIsError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [query, pageNumber, url]);

  return { loading, isError, resData, hasMore };
}

export default useInfiniteScroll;

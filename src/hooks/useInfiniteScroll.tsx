import { BASE_URL } from "@/utils";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

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
  console.log("Coming... reset", reset);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [resData, setResData] = useState<T[]>([]);

  useEffect(() => {
    setResData([]);
  }, [query]);

  const fetchData = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}${url}`,
      params: {
        pageNo: pageNumber,
        perPage: 15,
        searchStr: query,
        ...extParams,
      },
      withCredentials: true,
    })
      .then((res) => {
        const newData: T[] = res?.data?.data;
        if (setData) setData(newData);
        setResData((prevData) => [...prevData, ...newData]);
        setHasMore(newData.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        if (axios.isCancel(err)) return;
        setIsError(true);
      });
  };

  useEffect(() => {
    if (reset) fetchData();
  }, [reset]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [query, pageNumber, isOpen]);

  return { loading, isError, resData, hasMore };
}

export default useInfiniteScroll;

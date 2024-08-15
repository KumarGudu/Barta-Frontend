import { BASE_URL } from "@/utils";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

type InfiniteScrollType<T> = {
  query?: string;
  pageNumber: number;
  url: string;
  data: T[];
  setData: (users: Partial<T>[]) => void;
};

function useInfiniteScroll<T>({
  query,
  pageNumber,
  url,
  data,
  setData,
}: InfiniteScrollType<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  // const [data, setData] = useState<Partial<T>[]>([]);

  console.log({ pageNumber, url, data, setData });
  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(false);
    setIsError(false);
    let cancel: any;
    axios({
      method: "GET",
      url: `${BASE_URL}${url}`,
      params: { q: query, pageNo: pageNumber, perPage: 15 },
      withCredentials: true,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const newData: T[] = res?.data?.data;
        setData(newData);
        setHasMore(newData.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, isError, data, hasMore };
}

export default useInfiniteScroll;

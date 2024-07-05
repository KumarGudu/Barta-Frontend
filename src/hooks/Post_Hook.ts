import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { BASE_URL } from "@/utils";

interface UsePostReturn<T, B> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  postData: (body: B) => Promise<void>;
}

const usePost = <T = any, B = any>(
  url: string,
  options?: AxiosRequestConfig
): UsePostReturn<T, B> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fullUrl = `${BASE_URL}/${url}`;
  const postData = useCallback(
    async (body: B) => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<T> = await axios.post(
          fullUrl,
          body,
          options
        );
        setData(response.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    },
    [fullUrl, options]
  );

  return { data, loading, error, postData };
};

export default usePost;

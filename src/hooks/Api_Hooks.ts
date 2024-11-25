import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "@/utils";
import { headers } from "next/headers";

interface UsePostDataResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  postData: (
    url: string,
    payload: any,
    config?: AxiosRequestConfig,
    isModal?: boolean
  ) => Promise<void>;
}

export const usePostData = <T>(): UsePostDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = async (
    url: string,
    payload: any,
    config?: AxiosRequestConfig,
    isModal?: boolean
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response: AxiosResponse<{ data: T }> = await axios.post(
        BASE_URL + url,
        payload,
        {
          ...config,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
            ...config?.headers,
          },
        }
      );

      setData(response.data.data);
      if (isModal) {
        Swal.fire({
          title: "Success",
          text: `${(response.data as any).msg}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.log({ err });
      if (isModal) {
        Swal.fire(
          "Error",
          (err as any).response.data.error.message || "Something went wrong!",
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, postData };
};

export const fetcher = (url: string) =>
  fetch(`${BASE_URL}${url}`).then((res) => res.json());

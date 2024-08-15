import React, { useEffect, useState } from "react";
import { Check, MoreVert } from "@mui/icons-material";
import { usePostData } from "@/hooks/Api_Hooks";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/Auth.store";

const Group_And_Chat_Functionality = () => {
  const [isLogoutDropDown, setIsLogoutDropDown] = useState<boolean>(false);
  const { data, error, isLoading, postData } = usePostData<any>();
  const router = useRouter();
  const handleLogOut = async () => {
    await postData(
      "auth/log-out",
      {},
      {
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    let timeOutId: any;
    if (data) {
      timeOutId = setTimeout(() => {
        router.push("/");
      }, 3000);
      window.location.reload();
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [data]);
  return (
    <div className="relative">
      <MoreVert
        fontSize="large"
        className="cursor-pointer"
        onClick={() => setIsLogoutDropDown(!isLogoutDropDown)}
      />
      {isLogoutDropDown && (
        <div className="absolute w-[15rem] h-[20rem] right-5  bg-gray-200 flex flex-col items-center py-2">
          <button onClick={handleLogOut} disabled={isLoading}>
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Group_And_Chat_Functionality;

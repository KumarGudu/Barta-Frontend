import React, { useEffect, useState } from "react";
import { usePostData } from "@/hooks/Api_Hooks";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/Auth.store";
import { BiDotsVertical } from "react-icons/bi";

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
      },
      true
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
      <BiDotsVertical
        size={22}
        className="cursor-pointer text-gray-300"
        onClick={() => setIsLogoutDropDown(!isLogoutDropDown)}
      />
      {isLogoutDropDown && (
        <div className="absolute w-[15rem] h-[3rem] right-5  bg-white border border-gray-300 shadow-md flex flex-col items-center py-2">
          <button onClick={handleLogOut} disabled={isLoading}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Group_And_Chat_Functionality;

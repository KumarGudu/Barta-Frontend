import React, { useEffect, useState } from "react";
import { Check, MoreVert } from "@mui/icons-material";
import { usePostData } from "@/hooks/Api_Hooks";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

const Log_Out = () => {
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

  console.log(data);

  useEffect(() => {
    let timeOutId: any;
    if (data) {
      timeOutId = setTimeout(() => {
        router.push("/");
      }, 3000);
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
          <Button
            onClick={handleLogOut}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Check />}
          >
            logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Log_Out;

import React, { useState } from "react";
import dynamic from "next/dynamic";

import { BiMessageSquareAdd, BiGroup, BiDisc } from "react-icons/bi";
import Drawer from "@mui/material/Drawer";
import Group_And_Chat_Functionality from "./create_group_and_chat/Group_And_Chat_Functionality";
const All_Users = dynamic(() => import("./all_users/All_Users"), {
  loading: () => (
    <Drawer>
      <h1 className="text-5xl text-black">Loading....</h1>
    </Drawer>
  ),
});

const Left_Nav_Bar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="h-[4rem] flex items-center justify-between px-2 bg-[#075E54] border-r-2 border-gray-300">
      <div className="basis-[30%]">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          alt="profilePic"
          width={50}
          height={50}
          className="rounded-full mt-1"
        />
      </div>

      <div className="flex justify-evenly basis-[70%]">
        <div className="p-2 flex justify-center items-center">
          <BiDisc size={22} className="cursor-pointer text-gray-300" />
        </div>
        <div className="p-2 flex justify-center items-center">
          <BiGroup size={22} className="cursor-pointer text-gray-300" />
        </div>
        <div className="p-2 flex justify-center items-center">
          <BiMessageSquareAdd
            size={22}
            className="cursor-pointer text-center text-gray-300"
            onClick={() => setOpen(true)}
          />
          {open && <All_Users open={open} setOpen={setOpen} />}
        </div>
        <div className="p-2 flex justify-center items-center">
          <Group_And_Chat_Functionality />
        </div>
      </div>
    </div>
  );
};

export default Left_Nav_Bar;

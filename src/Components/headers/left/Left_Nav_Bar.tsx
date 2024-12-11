import React, { useState } from "react";
import dynamic from "next/dynamic";

import { BiMessageSquareAdd, BiGroup, BiDisc } from "react-icons/bi";
import Drawer from "@mui/material/Drawer";
import Group_And_Chat_Functionality from "./create_group_and_chat/Group_And_Chat_Functionality";
const All_Users = dynamic(() => import("./all_users/All_Users"), {
  loading: () => (
    <Drawer>
      <h1 className="text-xl text-black">Loading...</h1>
    </Drawer>
  ),
});

const Left_Nav_Bar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-16 flex items-center justify-between px-2 bg-[#075E54] border-r-2 border-gray-300">
      {/* Profile Image */}
      <div className="basis-1/3 md:basis-1/4 flex justify-start">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          alt="profilePic"
          className="rounded-full mt-1 w-12 h-12 md:w-14 md:h-14"
        />
      </div>

      {/* Icon Section */}
      <div className="flex justify-end items-center basis-2/3 md:basis-3/4 gap-2">
        {/* Individual Icon Buttons */}
        {/* <div className="p-2 flex justify-center items-center">
          <BiDisc
            size={22}
            className="cursor-pointer text-gray-300 hover:text-white"
          />
        </div> */}
        {/* <div className="p-2 flex justify-center items-center">
          <BiGroup
            size={22}
            className="cursor-pointer text-gray-300 hover:text-white"
          />
        </div> */}
        <div className="p-2 flex justify-center items-center">
          <BiMessageSquareAdd
            size={22}
            className="cursor-pointer text-gray-300 hover:text-white"
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

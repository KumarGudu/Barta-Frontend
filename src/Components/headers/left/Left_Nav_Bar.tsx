import React, { useState } from "react";
import { Groups, PlayCircleOutline, Album, AddBox } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import Log_Out from "./logout/Log_Out";

const Left_Nav_Bar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-[4rem] flex items-center justify-between px-2">
      <div className="basis-[30%]">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          alt="profilePic"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>

      <div className="flex justify-evenly basis-[70%] text-gray-600">
        <Album
          fontSize="large"
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <div className="w-[25rem]">
            <h1>Drawer</h1>
          </div>
        </Drawer>
        <Groups fontSize="large" className="cursor-pointer" />
        <AddBox fontSize="large" className="cursor-pointer" />
        <Log_Out />
      </div>
    </div>
  );
};

export default Left_Nav_Bar;

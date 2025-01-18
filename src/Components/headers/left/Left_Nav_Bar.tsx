import React, { useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { BiMessageSquareAdd, BiGroup, BiDisc } from "react-icons/bi";
import Drawer from "@mui/material/Drawer";
import Group_And_Chat_Functionality from "./create_group_and_chat/Group_And_Chat_Functionality";
import useAuthStore from "@/stores/Auth.store";
const All_Users = dynamic(() => import("./all_users/All_Users"), {
  loading: () => (
    <Drawer>
      <h1 className="text-xl text-black">Loading...</h1>
    </Drawer>
  ),
});

const Left_Nav_Bar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [open_1, setOpen_1] = useState<boolean>(true);

  const handleOpen = () => setOpen_1(true);
  const handleClose = () => setOpen_1(false);

  const { user } = useAuthStore();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="h-16 flex items-center justify-between px-2 bg-[#075E54] border-r-2 border-gray-300">
      {/* Profile Image */}
      <div
        className="basis-1/3 md:basis-1/4 flex cursor-pointer justify-center items-center gap-3"
        onClick={handleOpen}
      >
        <img
          src={`${
            user?.profileUrl
              ? user?.profileUrl
              : "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }`}
          alt="profilePic"
          className="rounded-full mt-1 w-12 h-12 md:w-12 md:h-12"
        />
        <p className="text-md text-white">You</p>
      </div>

      <div>
        <Modal
          open={open_1}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden">
              <div className="flex items-center justify-center mt-4">
                <img
                  className="w-32 h-32 rounded-full border-4 border-gray-200"
                  src={user?.profileUrl}
                  alt={user?.name}
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-gray-600 mt-2">Email: {user?.email}</p>
                <p className="text-gray-600 mt-1">Phone: {user?.phone}</p>
                <p className="text-gray-600 mt-1">Slug: {user?.slugName}</p>
              </div>
            </div>
          </Box>
        </Modal>
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

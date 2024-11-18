import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Popover from "@mui/material/Popover";
import { CgMailReply } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FaImage } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { MdAudioFile } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import SendImagePreview from "./SendImagePreview";
import SendProductModal from "./SendProductModal";

const ChooseMedia_01 = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isSendProductModalOpen, setIsSendProductModalOpen] =
    useState<boolean>(false);

  const mediaContent = [
    {
      id: 1,
      title: "Image",
      icon: <FaImage />,
    },
    {
      id: 2,
      title: "Send Product",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      id: 2,
      title: "Audio",
      icon: <MdAudioFile />,
    },
    {
      id: 3,
      title: "Document",
      icon: <IoDocument />,
    },
    {
      id: 4,
      title: "Video",
      icon: <FaVideo />,
    },
  ];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMediaModal = (item: any) => {
    if (item.id === 1) {
      setIsImageModalOpen(true);
    }
    if (item.id === 2) {
      setIsSendProductModalOpen(true);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <FiPlus aria-describedby={id} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)", // Adjusted shadow
            },
          },
        }}
      >
        <div className="h-full w-[12rem] flex px-2 py-1 gap-2 flex-col">
          {mediaContent.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-2 py-2  cursor-pointer"
              onClick={() => {
                handleMediaModal(item);
                setAnchorEl(null);
              }}
            >
              {item?.icon}
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </Popover>

      <SendImagePreview
        open={isImageModalOpen}
        handleClose={() => setIsImageModalOpen(false)}
        setAnchorEl={setAnchorEl}
      />
      <SendProductModal
        isSendProductModalOpen={isSendProductModalOpen}
        setIsSendProductModalOpen={setIsSendProductModalOpen}
      />
    </div>
  );
};

export default ChooseMedia_01;

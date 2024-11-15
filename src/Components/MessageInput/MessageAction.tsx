import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Popover from "@mui/material/Popover";
import { CgMailReply } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";

const MessageAction = ({ handleReplyMsg }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="absolute right-2 top-1 bg-gray-300 px-2 py-1 rounded-md">
      <IoIosArrowDown aria-describedby={id} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
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
        <ul className="text-[0.8rem] ">
          <li
            className="py-2 px-3 cursor-pointer flex items-center gap-1"
            onClick={() => {
              handleReplyMsg();
              setAnchorEl(null);
            }}
          >
            <CgMailReply size={17} />
            <p>Reply</p>
          </li>
          <li className="py-2 px-3 cursor-pointer flex items-center gap-1">
            <MdDeleteOutline size={16} />
            <p>Delete</p>
          </li>
          {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Message info</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">React</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Forward</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Pin</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Star</li> */}
        </ul>
      </Popover>
    </div>
  );
};

export default MessageAction;

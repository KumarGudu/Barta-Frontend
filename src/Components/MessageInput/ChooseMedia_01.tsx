import Popover from "@mui/material/Popover";
import React, { ChangeEvent, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import SendImagePreview from "./SendImagePreview";
import SendProductModal from "./SendProductModal";

const ChooseMedia_01 = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isSendProductModalOpen, setIsSendProductModalOpen] =
    useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement | null>(null);
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
  ];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMediaModal = (item: any) => {
    if (item.id === 1) {
      if (imageRef.current) {
        imageRef.current.click();
      }
    }
    if (item.id === 2) {
      setIsSendProductModalOpen(true);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (!filesList) return; // Ensure files exist

    const files: File[] = Array.from(filesList).filter(
      (file) => file instanceof File
    );

    const fileObjects = files.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileObjects]);
    setIsImageModalOpen(true);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <FiPlus
        aria-describedby={id}
        onClick={handleClick}
        size={23}
        className="cursor-pointer"
      />
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
              className="flex items-center gap-4 px-2 py-2  cursor-pointer hover:bg-cyan-600 hover:text-white"
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
      <input
        className="hidden"
        ref={imageRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <SendImagePreview
        open={isImageModalOpen}
        handleClose={() => setIsImageModalOpen(false)}
        setAnchorEl={setAnchorEl}
        uploadedFiles={uploadedFiles}
      />
      <SendProductModal
        isSendProductModalOpen={isSendProductModalOpen}
        setIsSendProductModalOpen={setIsSendProductModalOpen}
      />
    </div>
  );
};

export default ChooseMedia_01;

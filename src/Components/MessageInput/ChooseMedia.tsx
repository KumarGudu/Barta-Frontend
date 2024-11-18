import React, { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaImage } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { MdAudioFile } from "react-icons/md";
import SendImagePreview from "./SendImagePreview";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const ChooseMedia = ({ position = "bottom" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalStyles, setModalStyles] = useState({});
  const triggerButtonRef = useRef(null);
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
  const handleOpenModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      calculateModalPosition();
    }, 0);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const calculateModalPosition = () => {
    const triggerButton = triggerButtonRef.current;
    if (!triggerButton) return;

    const { top, left, height, width } = triggerButton.getBoundingClientRect();
    const modalPosition: any = {};

    // Calculate the modal's position based on the provided position prop
    switch (position) {
      case "top":
        modalPosition.top = `${top - 230}px`; // Adjust this value as per your design
        modalPosition.left = `${left}px`;
        break;
      case "left":
        modalPosition.top = `${top}px`;
        modalPosition.left = `${left - 300}px`; // Adjust this value for modal width
        break;
      case "bottom":
        modalPosition.top = `${top + height + 10}px`; // Slightly below the button
        modalPosition.left = `${left}px`;
        break;
      case "right":
        modalPosition.top = `${top}px`;
        modalPosition.left = `${left + width + 10}px`; // Slightly to the right of the button
        break;
      default:
        modalPosition.top = `${top + height + 10}px`; // Default to bottom
        modalPosition.left = `${left}px`;
    }

    setModalStyles(modalPosition);
  };

  const handleMediaModal = (item: any) => {
    if (item.id === 1) {
      setIsImageModalOpen(true);
    }
  };

  return (
    <div className="relative">
      <div
        ref={triggerButtonRef}
        onClick={handleOpenModal}
        className="cursor-pointer"
      >
        <FiPlus size={24} />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0"
          onClick={handleCloseModal}
        >
          <div
            className={`absolute w-fit bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform`}
            style={modalStyles}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full w-full flex  gap-2 flex-col">
              {mediaContent.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-2 py-2  cursor-pointer"
                  onClick={() => handleMediaModal(item)}
                >
                  {item?.icon}
                  <p>{item.title}</p>
                </div>
              ))}
            </div>

            {/* image preview modal */}
            {/* <SendImagePreview
              open={isImageModalOpen}
              handleClose={() => setIsImageModalOpen(false)}
              setIsOpen={setIsOpen}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseMedia;

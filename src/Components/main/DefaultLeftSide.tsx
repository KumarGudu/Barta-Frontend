import React from "react";
import { NoChatLoader } from "../core";

const DefaultLeftSide = () => {
  return (
    <div className="flex flex-col items-center bg-green-50 justify-center h-full gap-4">
      <NoChatLoader />
      <p className="text-center max-w-[70%] text-sm text-gray-600">
        Elevate Your Business Communication. Connect, Collaborate, Succeed.
        Empower Your Team with Seamless Chat Experience.
      </p>
    </div>
  );
};

export default DefaultLeftSide;

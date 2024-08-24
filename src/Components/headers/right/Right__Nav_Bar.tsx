import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import React, { useEffect } from "react";

const Right__Nav_Bar = () => {
  const { currentRoom } = useCurrentPrivateChatRoomStore();

  return (
    <div className="flex items-center gap-4 h-full px-7">
      <div>
        <img
          src={
            currentRoom?.profileUrl
              ? currentRoom?.profileUrl
              : "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }
          alt="profilePic"
          width={40}
          height={40}
          className="rounded-full mt-1"
        />
      </div>
      <div>
        <p>{currentRoom?.name ? currentRoom?.name : "NA"}</p>
      </div>
    </div>
  );
};

export default Right__Nav_Bar;

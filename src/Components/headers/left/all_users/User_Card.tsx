import { usePostData } from "@/hooks/Api_Hooks";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useSocketStore from "@/stores/Socket.store";
import { generateWhatsAppMessage } from "@/utils/functions";
import React, { useEffect } from "react";

const User_Card = ({
  name,
  profile,
  slugName,
  id,
  setOpen,
}: {
  name: string;
  profile: string;
  slugName: string;
  id: string;
  setOpen: (value: boolean) => void;
}) => {
  const { data, error, isLoading, postData } = usePostData<any>();
  const { setCurrentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();

  const createPrivateGroupChat = async () => {
    await postData(
      "chat/create-private-group-shomes",
      {
        receiver: id,
      },
      {
        withCredentials: true,
      },
      false
    );
  };

  useEffect(() => {
    if (data && !error) {
      // if (data?.isGroupChat) {
      socket.emit("JOIN_ROOM", {
        groupId: data?._id,
        groupName: data?.name,
        isPrivateGroup: data?.isGroupChat,
      });
      socket.on("ALERT", (message) => {
        console.log(message);
      });
      // }
      setCurrentRoom({
        name: name,
        slugName: slugName,
        profileUrl: profile,
        roomId: data?._id,
        userId: id,
      });
      setOpen(false);
    }

    if (data === null) {
      return () => {};
    }
  }, [data]);

  return (
    <div
      className="flex items-center bg-gray-400 gap-3 px-2 py-2 rounded-md cursor-pointer"
      onClick={createPrivateGroupChat}
    >
      <div>
        <img
          src={
            profile
              ? profile
              : "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }
          alt="profilePic"
          width={50}
          height={50}
          className="rounded-full mt-1"
        />
      </div>
      <div>
        <p>{name}</p>
        <p className="text-sm">
          {generateWhatsAppMessage().length > 20
            ? `${generateWhatsAppMessage().slice(0, 20)}.....`
            : `${generateWhatsAppMessage()}`}
        </p>
      </div>
    </div>
  );
};

export default User_Card;

import { usePostData } from "@/hooks/Api_Hooks";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useSocketStore from "@/stores/Socket.store";
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
  const { setCurrentRoom, currentRoom } = useCurrentPrivateChatRoomStore();

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
    if (data && !error && currentRoom?.roomId !== data?._id) {
      setCurrentRoom({
        name: name,
        slugName: slugName,
        profileUrl: profile,
        roomId: data?._id,
        isMessaged: data?.isMessaged,
        userId: id,
        members: data?.members,
      });
      setOpen(false);
    }

    if (data === null) {
      return () => {};
    }
  }, [data]);

  return (
    <div
      className="w-full px-3 flex items-center gap-4 py-[0.6rem] cursor-pointer border-b-[1px]  border-[#075e54] rounded-sm"
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
          className="rounded-full"
        />
      </div>
      <div>
        <p className="text-gray-800">{name}</p>
      </div>
    </div>
  );
};

export default User_Card;

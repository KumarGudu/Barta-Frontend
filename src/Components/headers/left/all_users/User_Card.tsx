import { usePostData } from "@/hooks/Api_Hooks";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLayoutStore from "@/stores/Layout.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
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
  const { setLiveMessages } = useLiveMessageStore();
  const { setScreen } = useLayoutStore();

  const createPrivateGroupChat = async () => {
    await postData(
      "chat/create-private-group-shomes",
      { receiver: id },
      { withCredentials: true },
      false
    );
    setLiveMessages([]);
  };

  useEffect(() => {
    if (data && !error && currentRoom?.roomId !== data?._id) {
      setScreen("chatScreen");
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
  }, [data, error]);

  return (
    <div
      className="w-full px-3 py-2 flex items-center gap-5 bg-white hover:bg-gray-100 border-b border-gray-300 rounded-lg transition duration-300 cursor-pointer shadow-sm hover:shadow-md sm:px-4 sm:py-3 sm:gap-4"
      onClick={createPrivateGroupChat}
    >
      <div className="flex-shrink-0">
        <img
          src={
            profile ||
            "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }
          alt="Profile"
          className="rounded-full border border-gray-300 w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>
      <div className="flex-1">
        <p className="text-gray-800 font-medium text-sm truncate sm:text-base">
          {name}
        </p>
        <p className="text-gray-500 text-xs truncate sm:text-sm">@{slugName}</p>
      </div>
    </div>
  );
};

export default User_Card;

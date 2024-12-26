import { useSwrInfiniteScroll } from "@/hooks/useSwrInfiniteScroll";
import useConnectedChatStore from "@/stores/AllConnectedChat.store";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import useOnlineUsersStore from "@/stores/onlineUsers.store";
import useSocketStore from "@/stores/Socket.store";
import { ConnectedChat, Member_Type } from "@/types";
import { debounce, formatLastMessageTime } from "@/utils/functions";
import React, { useCallback, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";

const All_Connected_Chat = ({ onSelectChat }: { onSelectChat: () => void }) => {
  const { SetConnectedChatMutate } = useConnectedChatStore();
  const { user } = useAuthStore();
  const { socket } = useSocketStore();
  const { connectedChatMutate } = useConnectedChatStore();
  const { setOnlineUsers } = useOnlineUsersStore();
  const { setLiveMessages } = useLiveMessageStore();
  const [searchStr, setSearchStr] = useState<string>("");
  const [text, setText] = useState<string>("");

  const {
    convertedData: connectedChats,
    size,
    setSize,
    isValidating,
    error,
    mutate,
    isReachedEnd,
    loadingMore,
  } = useSwrInfiniteScroll<ConnectedChat>({
    url: "chat/get-all-connected",
    perPage: 20,
    searchStr: searchStr,
  });

  useEffect(() => {
    SetConnectedChatMutate(mutate);
  }, [isReachedEnd, mutate, socket]);

  // set current private room chat for a normal user

  const { setCurrentRoom, currentRoom } = useCurrentPrivateChatRoomStore();
  const setCurrentPrivateRoomInfoForNormalUser = ({
    chat,
    receiver,
  }: {
    chat: ConnectedChat;
    receiver: Member_Type;
  }) => {
    onSelectChat();
    if (currentRoom?.roomId === chat?._id) {
      return;
    }
    setCurrentRoom({
      name: chat?.name,
      slugName: receiver?.slugName,
      profileUrl: receiver?.profileUrl,
      roomId: chat?._id,
      isMessaged: chat?.isMessaged,
      userId: receiver?._id,
      members: chat?.memberDetails?.map((member: Member_Type) => member._id),
      lastMessage: chat?.lastMessage,
    });

    setLiveMessages([]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("FIRST_TIME_MESSAGE", async ({ groupId, message }) => {
        connectedChatMutate();
      });
    }

    return () => {
      if (socket) {
        socket.off("FIRST_TIME_MESSAGE");
      }
    };
  }, [socket, currentRoom]);

  const debounceSearch = useCallback(
    debounce((value: string) => {
      console.log("Throttled Search:", value);
      setSearchStr(value);
    }, 500),
    []
  );

  const handleChange = (e: any) => {
    setText(e?.target?.value);
    debounceSearch(e?.target?.value);
  };

  // bg - [#dcf8c6];
  //   #075e54	(7,94,84)
  // #128c7e	(18,140,126)
  // #25d366	(37,211,102)
  // #dcf8c6	(220,248,198)
  // #ece5dd	(236,229,221)
  return (
    <div>
      <div className="h-[3rem] flex items-center justify-center p-1 border-r-2 border-[#25d366]">
        <div className="h-full w-full flex items-center p-2 gap-3 bg-gray-200 rounded-md">
          <div className="flex flex-1">
            <input
              type="text"
              className="h-full px-2 py-2 outline-none border-none w-full text-sm bg-transparent"
              placeholder="Search..."
              onChange={handleChange}
              value={text}
            />
          </div>
          <div className="w-[2rem]">
            <BiSearch size={22} className="text-gray-500" />
          </div>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="h-[calc(100%-7rem)] overflow-y-auto border-r-2 border-[#25d366]"
      >
        <InfiniteScroll
          className="space-y-2 py-4 px-[0.4rem]"
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={
            <>
              <h1>Loading.....</h1>
            </>
          }
          endMessage={<></>}
          dataLength={connectedChats?.length ?? 0}
          scrollableTarget="scrollableDiv"
        >
          {connectedChats?.map((chat: ConnectedChat, index: number) => {
            let receiver: Member_Type = chat?.memberDetails?.find((member) => {
              return user &&
                user?.role === "EMPLOYEE" &&
                chat?.memberDetails?.length <= 2
                ? member?._id !== user?._id
                : member?.role !== "ADMIN" && member?._id !== user?._id;
            });

            console.log("LAST_MSG", chat.lastMessage);

            if (chat?.isGroupChat) {
              return (
                <div key={chat?._id} className="w-full bg-white px-3">
                  <p className="text-gray-700">{chat?.name}</p>
                  <p className="text-gray-900">{chat?._id}</p>
                </div>
              );
            }

            return user?.role === "ADMIN" ? (
              <div
                key={chat?._id}
                className="w-full px-3 flex items-center gap-4 py-[0.6rem] cursor-pointer border-b-[1px] border-[#075e54] rounded-sm"
                onClick={() =>
                  setCurrentPrivateRoomInfoForNormalUser({ chat, receiver })
                }
              >
                <img
                  src={
                    receiver?.profileUrl ? receiver?.profileUrl : `/profile.png`
                  }
                  alt="receiver_img"
                  className="rounded-full flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />

                <div className="w-full overflow-hidden">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-sm sm:text-[0.9rem] font-normal tracking-wide truncate">
                      {receiver?.name && receiver?.name?.length > 30
                        ? receiver?.name.slice(0, 30) + "..."
                        : receiver?.name}
                    </p>
                    <p className="text-[0.65rem] sm:text-[0.7rem] font-medium text-gray-600">
                      {formatLastMessageTime(chat?.lastMessage?.createdAt)}
                    </p>
                  </div>
                  <p className="text-[0.7rem] sm:text-[0.75rem] mt-1 truncate">
                    {chat?.lastMessage?.content &&
                    chat?.lastMessage?.content?.length > 50
                      ? chat.lastMessage.content.slice(0, 50) + "..."
                      : chat?.lastMessage?.content}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={chat?._id}
                className="w-full px-3 flex items-center gap-4 py-[0.6rem] cursor-pointer border-b-[1px] border-[#075e54] rounded-sm"
                onClick={() =>
                  setCurrentPrivateRoomInfoForNormalUser({ chat, receiver })
                }
              >
                <img
                  src={
                    receiver?.profileUrl ? receiver?.profileUrl : `/profile.png`
                  }
                  alt="receiver_img"
                  className="rounded-full flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />

                <div className="w-full overflow-hidden">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-sm sm:text-[0.9rem] font-normal tracking-wide truncate">
                      {receiver?.name && receiver?.name?.length > 30
                        ? receiver?.name.slice(0, 30) + "..."
                        : receiver?.name}
                    </p>
                    <p className="text-[0.65rem] sm:text-[0.7rem] font-medium text-gray-600">
                      {formatLastMessageTime(chat?.lastMessage?.createdAt)}
                    </p>
                  </div>
                  <p className="text-[0.7rem] sm:text-[0.75rem] mt-1 truncate">
                    {chat?.lastMessage?.content &&
                    chat?.lastMessage?.content?.length > 50
                      ? chat.lastMessage.content.slice(0, 50) + "..."
                      : chat?.lastMessage?.content}
                  </p>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default All_Connected_Chat;

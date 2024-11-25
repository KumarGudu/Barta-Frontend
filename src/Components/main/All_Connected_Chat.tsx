import { useSwrInfiniteScroll } from "@/hooks/useSwrInfiniteScroll";
import useConnectedChatStore from "@/stores/AllConnectedChat.store";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useOnlineUsersStore from "@/stores/onlineUsers.store";
import useSocketStore from "@/stores/Socket.store";
import { ConnectedChat, Member_Type } from "@/types";
import { formatLastMessageTime } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const All_Connected_Chat = () => {
  const { SetConnectedChatMutate } = useConnectedChatStore();
  const { user } = useAuthStore();
  const { socket } = useSocketStore();
  const { connectedChatMutate } = useConnectedChatStore();
  const { setOnlineUsers } = useOnlineUsersStore();

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
    perPage: 5,
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
    if (currentRoom?.roomId === chat?._id) return;
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

  // bg - [#dcf8c6];
  //   #075e54	(7,94,84)
  // #128c7e	(18,140,126)
  // #25d366	(37,211,102)
  // #dcf8c6	(220,248,198)
  // #ece5dd	(236,229,221)
  return (
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
          console.log("Chat----------->", chat?.lastMessage);

          let receiver: Member_Type = chat?.memberDetails?.find((member) => {
            return member?.role !== "ADMIN" && member?._id !== user?._id;
          });

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
              className="w-full px-3 flex items-center gap-4 py-[0.6rem] cursor-pointer border-b-[1px]  border-[#075e54] rounded-sm"
              onClick={() =>
                setCurrentPrivateRoomInfoForNormalUser({ chat, receiver })
              }
            >
              <img
                src={
                  receiver?.profileUrl ? receiver?.profileUrl : `/profile.png`
                }
                alt="receiver_img"
                width={50}
                height={50}
                className="rounded-full"
              />

              <div className="w-full">
                <div className="w-full flex justify-between items-center">
                  <p className="text-[0.9rem] font-normal tracking-wide">
                    {receiver?.name && receiver?.name?.length > 30
                      ? receiver?.name.slice(0, 30) + "..."
                      : receiver?.name}
                  </p>
                  <p className="text-[0.7rem] font-medium text-gray-600">
                    {formatLastMessageTime(chat?.lastMessage?.createdAt)}
                  </p>
                </div>
                <p className="text-[0.75rem]">
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
              className="w-full px-3 flex items-center gap-4 py-[0.6rem] cursor-pointer border-b-[1px]  border-[#075e54] rounded-sm"
              onClick={() =>
                setCurrentPrivateRoomInfoForNormalUser({ chat, receiver })
              }
            >
              <img
                src={
                  receiver?.profileUrl ? receiver?.profileUrl : `/profile.png`
                }
                alt="receiver_img"
                width={50}
                height={50}
                className="rounded-full"
              />

              <div className="w-full">
                <div className="w-full flex justify-between items-center">
                  <p className="text-[0.9rem] font-normal tracking-wide">
                    {receiver?.name && receiver?.name?.length > 30
                      ? receiver?.name.slice(0, 30) + "..."
                      : receiver?.name}
                  </p>
                  <p className="text-[0.7rem] font-medium text-gray-600">
                    {formatLastMessageTime(chat?.lastMessage?.createdAt)}
                  </p>
                </div>
                <p className="text-[0.75rem]">
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
  );
};

export default All_Connected_Chat;

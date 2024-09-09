import { useSwrInfiniteScroll } from "@/hooks/useSwrInfiniteScroll";
import useConnectedChatStore from "@/stores/AllConnectedChat.store";
import useAuthStore from "@/stores/Auth.store";
import { ConnectedChat, Member_Type } from "@/types";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const All_Connected_Chat = () => {
  const { SetConnectedChatMutate } = useConnectedChatStore();
  const { user } = useAuthStore();

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
  }, [isReachedEnd, mutate]);

  return (
    <div
      id="scrollableDiv"
      className="h-[calc(100%-6.5rem)] bg-red-600 overflow-y-auto"
    >
      <InfiniteScroll
        className="space-y-5 px-2 py-4"
        next={() => setSize(size + 1)}
        hasMore={!isReachedEnd}
        loader={
          <>
            <h1>Loading.....</h1>
          </>
        }
        endMessage={
          <>
            <p>No more data..</p>
          </>
        }
        dataLength={connectedChats?.length ?? 0}
        scrollableTarget="scrollableDiv"
      >
        {connectedChats?.map((chat: ConnectedChat, index: number) => {
          console.log("Chat", chat);

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
            <div key={chat?._id} className="w-full bg-white px-3">
              <p className="text-gray-700">{chat?.name}</p>
              <p className="text-gray-900">{chat?._id}</p>
            </div>
          ) : (
            <div
              key={chat?._id}
              className="w-full bg-white px-3 flex items-center gap-2 py-2 rounded-md cursor-pointer"
            >
              <img
                src={receiver?.profileUrl}
                alt="receiver_img"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div>
                <p>{receiver?.name}</p>
                <p className="text-sm">
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

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useObserver from "@/hooks/useObserver";
import { useSwrInfiniteScroll } from "@/hooks/useSwrInfiniteScroll";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import useSocketStore from "@/stores/Socket.store";
import { LiveMsg } from "@/types";
import React, { useEffect, useRef, useState } from "react";

const Message_Cont = () => {
  let { messages, setLiveMessages } = useLiveMessageStore();
  const { user } = useAuthStore();
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    setPageNumber(1);
    setLiveMessages([]);
    setReset(true);
  }, [currentRoom]);

  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<LiveMsg>
  >({
    pageNumber: pageNumber,
    url: `chat/get-all-chats/${currentRoom?.roomId}`,
    reset,
  });

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [resData]);

  useEffect(() => {
    if (socket) {
      socket.on("ALERT", (message) => {
        console.log("Message===========", message);
      });
    }

    return () => {
      if (socket) socket.off("ALERT");
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("JOIN_ROOM", {
        groupId: currentRoom?.roomId,
        groupName: currentRoom?.name,
        isPrivateGroup: currentRoom?.isGroupChat,
        members: currentRoom?.members,
      });
    }

    return () => {
      if (socket)
        socket.emit("LEAVE_ROOM", {
          groupId: currentRoom?.roomId,
          groupName: currentRoom?.name,
          isPrivateGroup: currentRoom?.isGroupChat,
        });
    };
  }, [socket, currentRoom]);

  const allMessages =
    resData && resData?.length > 0 ? [...messages, ...resData] : [...messages];

  const { setCurrentRoom } = useCurrentPrivateChatRoomStore();
  useEffect(() => {
    setPageNumber(1);
  }, [setCurrentRoom]);

  const getMsgContCls = (userId: string, senderId: string) => {
    const className =
      userId !== senderId
        ? "w-fit py-3 px-4 rounded-md bg-green-500 self-start max-w-[32vw] break-words"
        : "w-fit py-3 px-4 rounded-md bg-gray-400 self-end max-w-[32vw] break-words";
    return className;
  };

  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

  return (
    <div className="flex flex-col-reverse overflow-y-auto h-full px-14 py-4 overflow-x-hidden gap-3">
      {allMessages &&
        allMessages.map((msg: Partial<LiveMsg>, index: number) => {
          if (allMessages?.length === index) {
            return msg?.type === "TEXT" ? (
              <div ref={lastBookElementRef} key={msg._id}>
                <div
                  key={msg?._id}
                  className={getMsgContCls(user?._id, msg?.sender?._id)}
                >
                  <p>{msg?.content}</p>
                </div>
              </div>
            ) : (
              <div
                ref={lastBookElementRef}
                key={msg._id}
                className={getMsgContCls(user?._id, msg?.sender?._id)}
              >
                <img
                  src={msg?.attachments[0]?.mediaUrl}
                  alt="home"
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>
            );
          } else {
            return msg?.type === "TEXT" ? (
              <div
                key={msg?._id}
                className={getMsgContCls(user?._id, msg?.sender?._id)}
              >
                <p>{msg?.content}</p>
              </div>
            ) : (
              <div
                key={msg._id}
                className={getMsgContCls(user?._id, msg?.sender?._id)}
              >
                <img
                  src={msg?.attachments[0]?.mediaUrl}
                  alt="home"
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>
            );
          }
        })}

      {loading && (
        <div className="h-[3rem]">
          <p>Loading..</p>
        </div>
      )}

      {isError && (
        <div className="h-[3rem]">
          <p>Error</p>
        </div>
      )}
    </div>
  );
};

export default Message_Cont;

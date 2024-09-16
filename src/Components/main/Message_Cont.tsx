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
  const { messages } = useLiveMessageStore();
  const { user } = useAuthStore();
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<LiveMsg>
  >({
    pageNumber: pageNumber,
    url: `chat/get-all-chats/${currentRoom?.roomId}`,
  });
  // const {
  //   convertedData: dataMsgs,
  //   size,
  //   setSize,
  //   isValidating,
  //   error,
  //   mutate,
  //   isReachedEnd,
  //   loadingMore,
  // } = useSwrInfiniteScroll<LiveMsg>({
  //   url: `chat/get-all-chats/${currentRoom?.roomId}`,
  //   perPage: 20,
  // });

  useEffect(() => {
    if (socket) {
      socket.on("ALERT", (message) => {
        console.log("Message=============>", message);
      });
    }

    return () => {
      if (socket) socket.off("ALERT");
    };
  }, [socket]);

  const allMessages =
    resData && resData?.length > 0 ? [...messages, ...resData] : [...messages];

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
    <div className="flex flex-col-reverse overflow-y-auto h-full p-4 overflow-x-hidden gap-3">
      {allMessages &&
        allMessages.map((msg: Partial<LiveMsg>, index: number) => {
          if (resData?.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={msg._id}>
                <div
                  key={msg?._id}
                  className={getMsgContCls(user?._id, msg?.sender?._id)}
                >
                  <p>{msg?.content}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={msg?._id}
                className={getMsgContCls(user?._id, msg?.sender?._id)}
              >
                <p>{msg?.content}</p>
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

      {/* {allMessages.map((msg: LiveMsg, index: number) => (
        <div
          key={msg?._id}
          className={getMsgContCls(user?._id, msg?.sender?._id)}
        >
          <p>{msg?.content}</p>
        </div>
      ))} */}
    </div>
  );
};

export default Message_Cont;

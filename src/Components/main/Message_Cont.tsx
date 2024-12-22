import React, { useEffect, useState, useMemo, useRef } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useObserver from "@/hooks/useObserver";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import useSocketStore from "@/stores/Socket.store";
import { LiveMsg, ReplyMsgType } from "@/types";
import useOnlineUsersStore from "@/stores/onlineUsers.store";
import { useRouter } from "next/router";
import useReplyMessageStore from "@/stores/ReplyMessage.store";
import { IoIosArrowDown } from "react-icons/io";
import { format } from "date-fns";
import { formatTimeOfFirstMessage } from "@/utils/functions";
import MessageAction from "../MessageInput/MessageAction";

const getMsgContCls = (userId: string, senderId: string) => {
  return userId !== senderId
    ? "w-fit self-start max-w-[80vw] sm:max-w-[60vw] lg:max-w-[32vw] break-words rounded-lg rounded-tl-none"
    : "w-fit self-end max-w-[80vw] sm:max-w-[60vw] lg:max-w-[32vw] break-words rounded-lg rounded-tr-none";
};

const Message_Cont = () => {
  const { messages, setLiveMessages } = useLiveMessageStore();
  const { user } = useAuthStore();
  const { currentRoom, setCurrentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const { onlineUsers, setOnlineUsers } = useOnlineUsersStore();
  const [pageNumber, setPageNumber] = useState(1);
  const [reset, setReset] = useState(false);
  const router = useRouter();

  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<LiveMsg>
  >({
    pageNumber,
    url: `chat/get-all-chats/${currentRoom?.roomId}`,
    reset,
  });

  useEffect(() => {
    setReset(true);
    setPageNumber(1);
  }, [currentRoom, setCurrentRoom]);

  useEffect(() => {
    if (reset) setReset(false);
  }, [resData]);

  // Merged socket event handlers into a single useEffect
  useEffect(() => {
    if (!socket) return;
    // Join room when socket and currentRoom exist
    socket.emit("JOIN_ROOM", {
      groupId: currentRoom?.roomId,
      groupName: currentRoom?.name,
      isPrivateGroup: currentRoom?.isGroupChat,
      members: currentRoom?.members,
    });

    const leaveRoom = () => {
      socket.emit("LEAVE_ROOM", {
        groupId: currentRoom?.roomId,
        groupName: currentRoom?.name,
        isPrivateGroup: currentRoom?.isGroupChat,
      });
    };
    const handleRouteChange = () => {
      leaveRoom();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      socket.emit("LEAVE_ROOM", {
        groupId: currentRoom?.roomId,
        groupName: currentRoom?.name,
        isPrivateGroup: currentRoom?.isGroupChat,
      });

      socket.on("ONLINE_USERS", (users) => {
        setOnlineUsers(users);
      });

      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [socket, currentRoom]);

  let allMessages = useMemo(
    () => (resData?.length ? [...messages, ...resData] : [...messages]),
    [messages, resData]
  );

  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

  //message reply logic
  const { setReplyMessage } = useReplyMessageStore();

  const handleReplyMessage = ({
    groupId,
    parentMsgContent,
    parentMsgId,
  }: ReplyMsgType) => {
    setReplyMessage({
      groupId,
      parentMsgContent,
      parentMsgId,
    });
  };

  //hover logic added
  const [hoverIdx, setHoverIdx] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  //demo
  return (
    <div
      className="flex flex-col-reverse overflow-y-auto h-full px-4 sm:px-8 md:px-12 py-4 sm:py-6 lg:py-7 overflow-x-hidden gap-2 sm:gap-3"
      ref={containerRef}
    >
      {allMessages.map((msg: Partial<LiveMsg>, index: number) => {
        const isLastMessage = allMessages.length === index + 1;
        const msgContent =
          msg?.type === "TEXT" ? (
            <p className="text-[0.75rem] sm:text-[0.9rem]">{msg?.content}</p>
          ) : msg?.type === "HOUSE" ? (
            <div className="flex flex-col items-start gap-2 p-3 sm:p-4 rounded-lg border shadow-sm w-full max-w-xs sm:max-w-sm">
              {msg?.attachments?.[0]?.imageUrl && (
                <img
                  src={msg.attachments[0].imageUrl}
                  alt="media"
                  className="w-full h-auto rounded-md object-contain"
                />
              )}
              {msg?.link && (
                <div className="w-full">
                  <a
                    href={msg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.7rem] sm:text-sm text-blue-500 hover:text-blue-700 underline truncate line-clamp-1"
                  >
                    {msg.link}
                  </a>
                </div>
              )}
            </div>
          ) : (
            <>
              {msg?.attachments?.length && (
                <div
                  className={`grid ${
                    msg?.attachments?.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  } gap-2`}
                >
                  {msg?.attachments?.map((item, i) => (
                    <img
                      src={item?.mediaUrl}
                      key={i}
                      alt="media"
                      className="w-full max-w-[150px] h-[15rem] rounded-md object-contain"
                    />
                  ))}
                </div>
              )}
            </>
          );

        return (
          <div
            key={msg._id}
            className={`${getMsgContCls(
              user?._id,
              msg?.sender?._id
            )} shadow-md bg-gray-100 sm:bg-gray-200 flex flex-col relative cursor-pointer gap-[0.1rem] sm:gap-[0.12rem] ${
              msg?.type === "IMAGE" ? "px-2 py-1" : "py-1 px-2 sm:px-3"
            }`}
            ref={isLastMessage ? lastBookElementRef : null}
            onMouseEnter={() => setHoverIdx(index)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            {hoverIdx === index && (
              <MessageAction
                handleReplyMsg={() =>
                  handleReplyMessage({
                    groupId: currentRoom?.roomId,
                    parentMsgContent:
                      msg.type === "IMAGE"
                        ? msg?.attachments[0]?.mediaUrl
                        : msg?.content,
                    parentMsgId: msg?._id,
                  })
                }
              />
            )}
            <div className="place-items-start">
              <p className="text-[0.6rem] sm:text-[0.7rem] font-medium">
                {msg?.sender?.name}
              </p>
            </div>

            <div className="flex flex-col">
              {msg?.isReplyMsg && (
                <div className="w-full px-2 sm:px-3 py-1 bg-white rounded-sm">
                  <p className="text-[0.65rem] sm:text-[0.8rem]">
                    {msg?.parentMsgContent}
                  </p>
                </div>
              )}
              <div className={msg?.isReplyMsg ? "mt-2 pl-1" : ""}>
                {msgContent}
              </div>
            </div>

            <div className="place-items-end">
              <p className="text-[0.6rem] sm:text-[0.7rem]">
                {msg?.createdAt
                  ? format(new Date(msg.createdAt), "hh:mm a")
                  : ""}
              </p>
            </div>
          </div>
        );
      })}
      {loading && (
        <div className="h-[3rem] flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {isError && (
        <div className="h-[3rem] flex justify-center items-center">
          <p>Error</p>
        </div>
      )}
    </div>
  );
};

export default Message_Cont;

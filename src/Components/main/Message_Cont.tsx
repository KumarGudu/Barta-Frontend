import React, { useEffect, useState, useMemo } from "react";
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

const getMsgContCls = (userId: string, senderId: string) => {
  return userId !== senderId
    ? "w-fit py-3 px-4 rounded-md bg-green-500 self-start max-w-[32vw] break-words"
    : "w-fit py-3 px-4 rounded-md bg-gray-400 self-end max-w-[32vw] break-words";
};

const Message_Cont = () => {
  const { messages, setLiveMessages } = useLiveMessageStore();
  const { user } = useAuthStore();
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const { onlineUsers, setOnlineUsers } = useOnlineUsersStore();
  const [pageNumber, setPageNumber] = useState(1);
  const [reset, setReset] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPageNumber(1);
    setLiveMessages([]);
    setReset(true);
  }, [currentRoom]);

  const { loading, resData, hasMore, isError, mutate } = useInfiniteScroll<
    Partial<LiveMsg>
  >({
    pageNumber,
    url: `chat/get-all-chats/${currentRoom?.roomId}`,
    reset,
  });

  useEffect(() => {
    if (reset) setReset(false);
  }, [resData]);

  // Merged socket event handlers into a single useEffect
  const { setChatMutate } = useCurrentPrivateChatRoomStore();
  useEffect(() => {
    if (!socket) return;

    setChatMutate(mutate);
    const handleAlert = (message: any) => {
      console.log("Message===========", message);
    };

    // Join room when socket and currentRoom exist
    socket.emit("JOIN_ROOM", {
      groupId: currentRoom?.roomId,
      groupName: currentRoom?.name,
      isPrivateGroup: currentRoom?.isGroupChat,
      members: currentRoom?.members,
    });

    socket.on("ALERT", handleAlert);
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

      socket.off("ALERT", handleAlert);
    };
  }, [socket, currentRoom]);

  const allMessages = useMemo(
    () => (resData?.length ? [...messages, ...resData] : [...messages]),
    [messages, resData]
  );

  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

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

  return (
    <div className="flex flex-col-reverse overflow-y-auto h-full px-14 py-4 overflow-x-hidden gap-3">
      {allMessages.map((msg: Partial<LiveMsg>, index: number) => {
        const isLastMessage = allMessages.length === index + 1;
        const msgContent =
          msg?.type === "TEXT" ? (
            <p>{msg?.content}</p>
          ) : (
            <img
              src={msg?.attachments[0]?.mediaUrl}
              alt="media"
              width={200}
              height={100}
              className="object-contain"
            />
          );

        return (
          <div
            key={msg._id}
            className={getMsgContCls(user?._id, msg?.sender?._id)}
            ref={isLastMessage ? lastBookElementRef : null}
          >
            {msg?.isReplyMsg && (
              <div>
                <p>{msg?.parentMsgContent}</p>
              </div>
            )}
            {msgContent}
            <div>
              <button
                onClick={() => {
                  return handleReplyMessage({
                    groupId: currentRoom?.roomId,
                    parentMsgContent:
                      msg.type === "IMAGE"
                        ? msg?.attachments[0]?.mediaUrl
                        : msg?.content,
                    parentMsgId: msg?._id,
                  });
                }}
              >
                reply
              </button>
            </div>
          </div>
        );
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

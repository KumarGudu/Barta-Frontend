import { usePostData } from "@/hooks/Api_Hooks";
import useConnectedChatStore from "@/stores/AllConnectedChat.store";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import useReplyMessageStore from "@/stores/ReplyMessage.store";
import useSocketStore from "@/stores/Socket.store";
import { LiveMsg } from "@/types";
import { isToday } from "date-fns";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
import ChooseMedia_01 from "../MessageInput/ChooseMedia_01";

const Send_Message_Input = () => {
  const [height, setHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");
  const [liveMsg, setLiveMsg] = useState<LiveMsg | null>(null);
  const { currentRoom, setCurrentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const { setLiveMessage } = useLiveMessageStore();
  const { connectedChatMutate } = useConnectedChatStore();
  const { user } = useAuthStore();
  const typingTimeout = useRef(null);
  const { message: replyMessage, setReplyMessage } = useReplyMessageStore();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);

    if (socket) {
      socket.emit("START_TYPING", {
        groupId: currentRoom?.roomId,
        name: user?.name,
        userId: user?._id,
      });

      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }

      typingTimeout.current = setTimeout(() => {
        socket.emit("STOP_TYPING", {
          groupId: currentRoom?.roomId,
          name: user?.name,
          userId: user?._id,
        });
      }, 2000);
    }
  };

  const { data, error, isLoading, postData } = usePostData();
  const { setIsLiveMessageAdded } = useLiveMessageStore();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!message.trim()) return;

      const isCreatedAtToday = isToday(
        new Date(currentRoom?.lastMessage?.createdAt)
      );

      let isFirstMessageOfTheDay = false;
      if (currentRoom?.lastMessage?.createdAt && isCreatedAtToday === false) {
        setCurrentRoom(currentRoom);
        isFirstMessageOfTheDay = true;
      }

      if (replyMessage && replyMessage !== null) {
        await postData(
          "chat/reply-to-message",
          {
            parentMsgId: replyMessage?.parentMsgId,
            groupId: replyMessage?.groupId,
            content: message.trim(),
            parentMsgContent: replyMessage?.parentMsgContent,
            isFirstMessageOfTheDay,
          },
          {
            withCredentials: true,
          },
          false
        );

        setReplyMessage(null);
        setMessage("");
        return;
      }

      const messageToSend = {
        groupId: currentRoom?.roomId,
        type: "TEXT",
        message: message.trim(),
        isFirstMessageOfTheDay,
        ...(currentRoom?.isMessaged === false && {
          isFirstTime: true,
          members: currentRoom?.members,
        }),
      };

      socket.emit("NEW_MESSAGE", messageToSend);

      if (currentRoom?.isMessaged === false) {
        setCurrentRoom({
          ...currentRoom,
          isMessaged: true,
        });
      }

      setMessage("");
      setIsLiveMessageAdded(true);
    }
  };

  const sendMessageByBtnClick = async () => {
    // Prevent sending empty or whitespace-only messages
    if (!message.trim()) return;

    const isCreatedAtToday = isToday(
      new Date(currentRoom?.lastMessage?.createdAt)
    );

    let isFirstMessageOfTheDay = false;
    if (currentRoom?.lastMessage?.createdAt && isCreatedAtToday === false) {
      setCurrentRoom(currentRoom);
      isFirstMessageOfTheDay = true;
    }

    if (replyMessage && replyMessage !== null) {
      await postData(
        "chat/reply-to-message",
        {
          parentMsgId: replyMessage?.parentMsgId,
          groupId: replyMessage?.groupId,
          content: message.trim(),
          parentMsgContent: replyMessage?.parentMsgContent,
          isFirstMessageOfTheDay,
        },
        {
          withCredentials: true,
        },
        false
      );

      setReplyMessage(null);
      setMessage("");
      return;
    }

    const messageToSend = {
      groupId: currentRoom?.roomId,
      type: "TEXT",
      message: message.trim(),
      isFirstMessageOfTheDay,
      ...(currentRoom?.isMessaged === false && {
        isFirstTime: true,
        members: currentRoom?.members,
      }),
    };

    socket.emit("NEW_MESSAGE", messageToSend);

    if (currentRoom?.isMessaged === false) {
      setCurrentRoom({
        ...currentRoom,
        isMessaged: true,
      });
    }

    setMessage("");
    setIsLiveMessageAdded(true);
  };

  if (error) {
    console.log({ error });
  }

  useEffect(() => {
    if (socket) {
      socket.on("NEW_MESSAGE", async ({ groupId, message }) => {
        setLiveMessage(message);
        setLiveMsg(message);
        connectedChatMutate();
      });

      setIsLiveMessageAdded(true);

      return () => {
        socket.off("NEW_MESSAGE");
      };
    }
  }, [socket, setLiveMessage]);

  useEffect(() => {
    adjustHeight();
  }, [message]);

  //delete reply message
  const handleDeleteReplyMessage = () => {
    setReplyMessage(null);
  };

  return (
    <div className="bg-[#dcf8c6] w-full absolute left-0 bottom-0">
      {replyMessage && (
        <div className="w-full flex items-center justify-center px-2 mt-2">
          <div className="bg-slate-300 py-3 px-3 sm:py-4 sm:px-4 w-full sm:w-[calc(100%-11rem)] relative rounded-md">
            <div
              className="absolute top-2 right-2 cursor-pointer p-1"
              onClick={handleDeleteReplyMessage}
            >
              <FiX className="text-gray-600 hover:text-gray-800" size={20} />
            </div>
            <p className="text-sm sm:text-base text-gray-700">
              {replyMessage?.parentMsgContent}
            </p>
          </div>
        </div>
      )}
      <div className="flex items-end min-h-[3.5rem] sm:min-h-[4rem] max-h-[12rem] py-2 px-2 gap-2 sm:gap-3">
        {/* Left Actions */}
        <div className="h-[3rem] sm:h-[3.5rem] w-[5rem] sm:w-[6rem] flex items-center justify-center">
          <div className="flex gap-3 sm:gap-4 items-center px-1 py-1">
            <ChooseMedia_01 />
          </div>
        </div>

        {/* Text Input Area */}
        <div className="flex-grow">
          <textarea
            className="text-xs sm:text-sm md:text-base font-medium text-gray-800 w-full max-h-[5rem] overflow-y-auto resize-none px-4 py-2 outline-none rounded-lg placeholder-gray-400"
            ref={textareaRef}
            rows={2}
            style={{ height: height }}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
        </div>

        {/* Send Button */}
        <div className="h-[3rem] sm:h-[3.5rem] w-[4rem] sm:w-[5rem] flex items-center justify-center">
          <div
            className="cursor-pointer px-2 py-1"
            onClick={sendMessageByBtnClick}
          >
            <LuSendHorizontal
              className="text-blue-600 hover:text-blue-800"
              size={22}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send_Message_Input;

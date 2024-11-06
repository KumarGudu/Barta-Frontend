import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSwrInfiniteScroll } from "@/hooks/useSwrInfiniteScroll";
import useConnectedChatStore from "@/stores/AllConnectedChat.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import useNotificationStore from "@/stores/Notification.store";
import useSocketStore from "@/stores/Socket.store";
import { ConnectedChat, LiveMsg } from "@/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import ChooseMedia from "../MessageInput/ChooseMedia";
import useAuthStore from "@/stores/Auth.store";
import useReplyMessageStore from "@/stores/ReplyMessage.store";
import { FiX } from "react-icons/fi";
import { usePostData } from "@/hooks/Api_Hooks";
import EmojiPickerModel from "../dialogs/EmojiPicker";

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

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (replyMessage && replyMessage !== null) {
        await postData(
          "chat/reply-to-message",
          {
            parentMsgId: replyMessage?.parentMsgId,
            groupId: replyMessage?.groupId,
            content: message,
            parentMsgContent: replyMessage?.parentMsgContent,
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

      if (currentRoom?.isMessaged === false) {
        const messageToSend = {
          groupId: currentRoom?.roomId,
          type: "TEXT",
          message: message,
          isFirstTime: true,
          members: currentRoom?.members,
        };

        socket.emit("NEW_MESSAGE", messageToSend);
        // update the current chat room that is messaged is become true
        setCurrentRoom({
          ...currentRoom,
          isMessaged: true,
        });
      } else {
        const messageToSend = {
          groupId: currentRoom?.roomId,
          type: "TEXT",
          message: message,
        };
        socket.emit("NEW_MESSAGE", messageToSend);
      }

      connectedChatMutate();
      setMessage("");
    }
  };

  if (error) {
    console.log({ error });
  }

  useEffect(() => {
    if (socket) {
      socket.on("NEW_MESSAGE", async ({ groupId, message }) => {
        setLiveMessage(message);
        setLiveMsg(message);
      });

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
          <div className="bg-green-400 py-3 px-3 w-[calc(100%-11rem)] relative">
            <div
              className="absolute top-1 right-3 cursor-pointer p-1"
              onClick={handleDeleteReplyMessage}
            >
              <FiX />
            </div>
            <p>{replyMessage?.parentMsgContent}</p>
          </div>
        </div>
      )}
      <div className="flex items-end min-h-[4rem]  max-h-[10rem] py-2 px-2 gap-3">
        <div className="h-[3.5rem] w-[6rem]  flex items-center justify-center">
          <div className="flex gap-4 items-center  px-1 py-1">
            <div className="cursor-pointer">
              <BsEmojiSmile size={22} />
            </div>
            <ChooseMedia position="top" />
          </div>
        </div>
        <div className="flex-grow">
          <textarea
            className="text-sm font-semibold text-input w-full max-h-[9rem] overflow-y-auto resize-none place-content-center px-5 py-1 outline-none rounded-lg"
            ref={textareaRef}
            style={{ height: height }}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            // onKeyUp={handleKeyUp}
            placeholder="Type a message..."
          />
        </div>
        <div className="h-[3.5rem] w-[5rem] flex items-center">
          <div className="cursor-pointer ml-3 px-2 py-1">
            <LuSendHorizonal size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send_Message_Input;

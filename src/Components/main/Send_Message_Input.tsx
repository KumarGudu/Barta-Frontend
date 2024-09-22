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

const Send_Message_Input = () => {
  const [height, setHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");
  const [liveMsg, setLiveMsg] = useState<LiveMsg | null>(null);
  const { currentRoom, setCurrentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const { setLiveMessage } = useLiveMessageStore();
  const { connectedChatMutate } = useConnectedChatStore();
  const { setNotification } = useNotificationStore();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

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

  return (
    <div className="min-h-[4rem]  max-h-[10rem] bg-pink-300 flex items-end gap-3 w-full absolute left-0 bottom-0 py-2 px-2">
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
  );
};

export default Send_Message_Input;

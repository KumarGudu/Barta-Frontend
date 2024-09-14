import useAuthStore from "@/stores/Auth.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import useSocketStore from "@/stores/Socket.store";
import { LiveMsg } from "@/types";
import React, { useEffect, useRef } from "react";

const Message_Cont = () => {
  const { messages } = useLiveMessageStore();
  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketStore();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("ALERT", (message) => {
        console.log("Message=============>", message);
      });
    }
  }, [socket]);

  const getMsgContCls = (userId: string, senderId: string) => {
    const className =
      userId !== senderId
        ? "w-fit py-3 px-4 rounded-md bg-green-500 self-start max-w-[32vw] break-words"
        : "w-fit py-3 px-4 rounded-md bg-gray-400 self-end max-w-[32vw] break-words";
    return className;
  };

  return (
    <div className="flex flex-col-reverse overflow-y-auto h-full p-4 overflow-x-hidden gap-3">
      {messages.map((msg: LiveMsg, index: number) => (
        <div
          key={msg?._id}
          className={getMsgContCls(user?._id, msg?.sender?._id)}
        >
          <p>{msg?.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Message_Cont;

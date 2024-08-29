import useAuthStore from "@/stores/Auth.store";
import useLiveMessageStore from "@/stores/LiveMassageStore";
import { LiveMsg } from "@/types";
import React from "react";

type messageType = {
  id: string;
  sender: string;
  receiver: string;
  message: string;
};

const messages: messageType[] = [
  {
    id: "1",
    sender: "s",
    receiver: "p",
    message: "Hii, How are you !!",
  },
  {
    id: "2",
    sender: "p",
    receiver: "s",
    message: "I am fine what about you ?? ",
  },
  {
    id: "3",
    sender: "s",
    receiver: "p",
    message: "Yaa i am fine also thank you for asking.",
  },

  {
    id: "4",
    sender: "s",
    receiver: "p",
    message: "Where are you now ??",
  },
  {
    id: "5",
    sender: "p",
    receiver: "s",
    message: "I am in bhubeneswar right now",
  },
  {
    id: "6",
    sender: "p",
    receiver: "s",
    message: "Where are you now ??",
  },
];
const Message_Cont = () => {
  const { messages } = useLiveMessageStore();
  const { user } = useAuthStore();

  const getMsgContCls = (userId: string, senderId: string) => {
    const className =
      userId !== senderId
        ? "w-fit py-3 px-4 rounded-md bg-green-500 self-start max-w-[35vw]"
        : "w-fit py-3 px-4 rounded-md bg-gray-400 self-end max-w-[35vw]";
    return className;
  };
  return (
    <div className="h-full px-4 py-4 flex flex-col gap-2">
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

(message: messageType, index: number) => (
  <div
    className={`w-fit py-3 px-4 rounded-md ${
      message.receiver === "p"
        ? `bg-green-500 self-end`
        : ` bg-gray-400 self-start`
    } max-w-[35vw]`}
    key={message.id}
  >
    <p>{message.message}</p>
  </div>
);

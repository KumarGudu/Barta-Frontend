import React, { useEffect, useState } from "react";
import Send_Message_Input from "@/components/normal/Send_Message_Input";
import Auth_Layout from "@/components/normal/Auth_Layout";
import useSocketStore from "@/stores/Socket.store";
import Left_Nav_Bar from "@/components/headers/left/Left_Nav_Bar";
import Right__Nav_Bar from "@/components/headers/right/Right__Nav_Bar";

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
    id: "2",
    sender: "p",
    receiver: "s",
    message: "Where are you now ??",
  },
];

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const { connect, disConnect } = useSocketStore();
  useEffect(() => {
    connect();
    return () => {
      disConnect();
    };
  }, [connect, disConnect]);

  return (
    <Auth_Layout>
      <main className="flex h-screen relative">
        <div className="w-[25rem]">
          <div>
            <Left_Nav_Bar />
            <div className="h-[3rem] bg-gray-500">
              <h1>Search bar</h1>
            </div>
          </div>
          <div className="h-[calc(100%-6.5rem)] bg-red-500  overflow-y-auto p-4 flex flex-col gap-4">
            <p>kol</p>
          </div>
        </div>
        <div className="bg-yellow-300 w-[calc(100%-25rem)] relative">
          <div className="h-[4rem] bg-pink-300">
            <Right__Nav_Bar />
          </div>
          <div className="h-[calc(100%-8rem)] overflow-y-auto">
            <div className="h-full px-4 py-4 flex flex-col gap-2">
              {messages.map((message: messageType, index: number) => (
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
              ))}
            </div>
          </div>
          <Send_Message_Input message={message} setMessage={setMessage} />
        </div>
      </main>
    </Auth_Layout>
  );
};

export default Chat;

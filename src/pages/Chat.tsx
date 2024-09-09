import React, { useEffect, useState } from "react";
import Send_Message_Input from "@/components/main/Send_Message_Input";
import Auth_Layout from "@/components/main/Auth_Layout";
import useSocketStore from "@/stores/Socket.store";
import Left_Nav_Bar from "@/components/headers/left/Left_Nav_Bar";
import Right__Nav_Bar from "@/components/headers/right/Right__Nav_Bar";
import { useSocket } from "@/hooks/Socket";
import Message_Cont from "@/components/main/Message_Cont";
import All_Connected_Chat from "@/components/main/All_Connected_Chat";

const Chat = () => {
  const { connect, disConnect } = useSocketStore();
  const socketToConnect = useSocket();
  useEffect(() => {
    connect(socketToConnect);
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
          <All_Connected_Chat />
          {/* <div className="h-[calc(100%-6.5rem)] bg-red-500  overflow-y-auto p-4 flex flex-col gap-4">
          </div> */}
        </div>
        <div className="bg-yellow-300 w-[calc(100%-25rem)] relative">
          <div className="h-[4rem] bg-pink-300">
            <Right__Nav_Bar />
          </div>
          <div className="h-[calc(100%-8rem)]">
            <Message_Cont />
          </div>
          <Send_Message_Input />
        </div>
      </main>
    </Auth_Layout>
  );
};

export default Chat;

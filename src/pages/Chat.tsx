import React, { useEffect, useState } from "react";
import useSocketStore from "@/stores/Socket.store";
import { useSocket } from "@/hooks/Socket";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useOnlineUsersStore from "@/stores/onlineUsers.store";
import { useRouter } from "next/router";
import { disconnect } from "process";
import useAuthStore from "@/stores/Auth.store";
import Auth_Layout from "@/Components/main/Auth_Layout";
import Left_Nav_Bar from "@/Components/headers/left/Left_Nav_Bar";
import All_Connected_Chat from "@/Components/main/All_Connected_Chat";
import Right__Nav_Bar from "@/Components/headers/right/Right__Nav_Bar";
import Message_Cont from "@/Components/main/Message_Cont";
import Send_Message_Input from "@/Components/main/Send_Message_Input";
import DefaultLeftSide from "@/Components/main/DefaultLeftSide";

const Chat = () => {
  const { connect, disConnect } = useSocketStore();
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const socketToConnect = useSocket();
  const { setOnlineUsers, onlineUsers } = useOnlineUsersStore();
  const { user } = useAuthStore();
  const router = useRouter();
  let { socket } = useSocketStore();

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
        </div>

        {currentRoom ? (
          <div className="bg-yellow-300 w-[calc(100%-25rem)] relative">
            <div className="h-[4rem] bg-pink-300">
              <Right__Nav_Bar />
            </div>
            <div className="h-[calc(100%-8rem)]">
              <Message_Cont />
            </div>
            <Send_Message_Input />
          </div>
        ) : (
          <div className="bg-yellow-300 w-[calc(100%-25rem)] relative">
            <DefaultLeftSide />
          </div>
        )}
      </main>
    </Auth_Layout>
  );
};

export default Chat;

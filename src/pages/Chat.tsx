import React, { useEffect } from "react";
import useSocketStore from "@/stores/Socket.store";
import { useSocket } from "@/hooks/Socket";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import Auth_Layout from "@/Components/main/Auth_Layout";
import Left_Nav_Bar from "@/Components/headers/left/Left_Nav_Bar";
import All_Connected_Chat from "@/Components/main/All_Connected_Chat";
import Right__Nav_Bar from "@/Components/headers/right/Right__Nav_Bar";
import Message_Cont from "@/Components/main/Message_Cont";
import Send_Message_Input from "@/Components/main/Send_Message_Input";
import DefaultLeftSide from "@/Components/main/DefaultLeftSide";
import { BiSearch } from "react-icons/bi";

const Chat = () => {
  const { connect, disConnect } = useSocketStore();
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const socketToConnect = useSocket();

  useEffect(() => {
    connect(socketToConnect);

    return () => {
      disConnect();
    };
  }, [connect, disConnect]);

  // bg - [#dcf8c6];
  return (
    <Auth_Layout>
      <main className="flex h-screen relative">
        <div className="w-[25rem]">
          <div>
            <Left_Nav_Bar />
            <div className="h-[3rem] flex items-center justify-center  p-1 border-r-2 border-[#25d366] ">
              <div className="h-full w-full flex items-center p-2 gap-3 bg-gray-200 rounded-md">
                <div className="flex flex-1 ">
                  <input
                    type="text"
                    className="h-full px-2 py-2 outline-none border-none w-full text-sm bg-transparent"
                  />
                </div>
                <div className="w-[2rem]">
                  <BiSearch size={22} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          <All_Connected_Chat />
        </div>
        {/* bg-[#dcf8c6] */}
        {currentRoom ? (
          <div className="w-[calc(100%-25rem)] relative">
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

import Left_Nav_Bar from "@/Components/headers/left/Left_Nav_Bar";
import Right__Nav_Bar from "@/Components/headers/right/Right__Nav_Bar";
import All_Connected_Chat from "@/Components/main/All_Connected_Chat";
import Auth_Layout from "@/Components/main/Auth_Layout";
import DefaultLeftSide from "@/Components/main/DefaultLeftSide";
import Message_Cont from "@/Components/main/Message_Cont";
import Send_Message_Input from "@/Components/main/Send_Message_Input";
import { useSocket } from "@/hooks/Socket";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useLayoutStore from "@/stores/Layout.store";
import useSocketStore from "@/stores/Socket.store";
import { useEffect } from "react";

const Chat = () => {
  const { connect, disConnect } = useSocketStore();
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const socketToConnect = useSocket();

  const { screen, isLargeScreen, setScreen, setIsLargeScreen } =
    useLayoutStore();

  useEffect(() => {
    connect(socketToConnect);
    return () => {
      disConnect();
    };
  }, [connect, disConnect]);

  // Handle screen size changes
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1024);
    if (window.innerWidth >= 1024) setScreen("userList"); // Show both on desktop
  };

  useEffect(() => {
    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize); // Listen to resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Select a chat room and switch screens for mobile
  const handleSelectChatRoom = () => {
    setScreen("chatScreen");
  };

  // Back button handler to return to user list
  const handleBackToUserList = () => {
    setScreen("userList");
  };

  return (
    <Auth_Layout>
      <main className="flex h-screen relative">
        {/* Sidebar (User List) */}
        {(screen === "userList" || isLargeScreen) && (
          <div className="w-full lg:w-[28rem]">
            <div>
              <Left_Nav_Bar />
              {/* Search Bar */}
            </div>
            <All_Connected_Chat onSelectChat={handleSelectChatRoom} />
          </div>
        )}

        {/* Chat Screen */}
        {(screen === "chatScreen" || isLargeScreen) && (
          <>
            {currentRoom ? (
              <div className="w-full lg:w-[calc(100%-28rem)] relative">
                {/* Chat Header */}
                <div className="h-[4rem] flex items-center bg-[#075E54]">
                  {/* Back Button for Mobile */}
                  {!isLargeScreen && (
                    <button
                      className="text-white px-4 py-2"
                      onClick={handleBackToUserList}
                    >
                      ← Back
                    </button>
                  )}
                  <Right__Nav_Bar />
                </div>
                {/* Chat Messages */}
                <div className="h-[calc(100%-8rem)]">
                  <Message_Cont />
                </div>
                {/* Message Input */}
                <Send_Message_Input />
              </div>
            ) : (
              <div className="bg-yellow-300 w-full lg:w-[calc(100%-28rem)] relative">
                <DefaultLeftSide />
              </div>
            )}
          </>
        )}
      </main>
    </Auth_Layout>
  );
};

export default Chat;

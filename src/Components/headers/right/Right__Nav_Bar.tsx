import { usePostData } from "@/hooks/Api_Hooks";
import { useFetchData } from "@/hooks/fetchData";
import useAuthStore from "@/stores/Auth.store";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import useOnlineUsersStore from "@/stores/onlineUsers.store";
import useSocketStore from "@/stores/Socket.store";
import React, { useEffect, useState } from "react";

type MEMBER = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type TYPE_USER = {
  userId: string;
  name: string;
};
const Right__Nav_Bar = () => {
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const { user } = useAuthStore();
  const [groupMembers, setGroupMembers] = useState<MEMBER[]>([]);
  const { onlineUsers, setOnlineUsers } = useOnlineUsersStore();
  const [typeUsers, setTypeUsers] = useState<string[]>([]);

  //get member info of a group
  const options = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  };
  const { data, error, isLoading, mutate } = useFetchData(
    `chat/get-private-group-info/${currentRoom?.roomId}`,
    options
  );

  useEffect(() => {
    if (data) {
      setGroupMembers((data as any).members);
    }
  }, [currentRoom, data]);

  useEffect(() => {
    if (socket) {
      socket.on("ONLINE_USERS", (users) => {
        setOnlineUsers(users);
      });

      socket.on("START_TYPING", ({ groupId, userId, name }) => {
        setTypeUsers((prevUsers) => {
          if (!prevUsers.includes(userId)) {
            return [...prevUsers, userId];
          }
          return prevUsers;
        });
      });

      socket.on("STOP_TYPING", ({ groupId, userId, name }) => {
        setTypeUsers((prevUsers) => {
          if (prevUsers.includes(userId)) {
            const filteredTypeUsers = prevUsers.filter(
              (user) => user !== userId
            );
            return filteredTypeUsers;
          }
          return prevUsers;
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("ONLINE_USERS");
        socket.off("STOP_TYPING");
        socket.off("START_TYPING");
      }
    };
  }, [socket]);

  return (
    <div className="flex items-center gap-4 h-full px-7 bg-[#075E54]">
      {/* Profile Image */}
      <div>
        <img
          src={
            currentRoom?.profileUrl ||
            "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }
          alt="profilePic"
          width={40}
          height={40}
          className="rounded-full mt-1"
        />
      </div>

      {/* Group Members */}
      <div>
        {groupMembers
          ?.filter((member: MEMBER) => member?._id !== user?._id)
          .map((member: MEMBER) => {
            // Check if member should be rendered for ADMIN role or not
            if (user?.role !== "ADMIN" && member?.role === "ADMIN") return null;

            // Determine member status (typing, online, or offline)
            const isTyping = typeUsers.includes(member._id);
            const isOnline = onlineUsers.includes(member._id);

            return (
              <div
                key={member?._id}
                className="flex flex-col justify-center mt-1"
              >
                {member?.role !== "ADMIN" && (
                  <p className="text-gray-300 text-sm">{member?.name}</p>
                )}

                <p className="text-[0.7rem] text-green-200">
                  {isTyping ? " typing..." : isOnline ? "online" : ""}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Right__Nav_Bar;

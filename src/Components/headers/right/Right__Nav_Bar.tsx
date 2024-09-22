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
const Right__Nav_Bar = () => {
  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const { socket } = useSocketStore();
  const { user } = useAuthStore();
  const [groupMembers, setGroupMembers] = useState<MEMBER[]>([]);
  const { onlineUsers, setOnlineUsers } = useOnlineUsersStore();

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
    }
    return () => {
      if (socket) socket.off("ONLINE_USERS");
    };
  }, [socket]);

  return (
    <div className="flex items-center gap-4 h-full px-7">
      <div>
        <img
          src={
            currentRoom?.profileUrl
              ? currentRoom?.profileUrl
              : "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }
          alt="profilePic"
          width={40}
          height={40}
          className="rounded-full mt-1"
        />
      </div>
      <div>
        {user?.role === "ADMIN" ? (
          <>
            <div>
              {groupMembers?.map((member: MEMBER) => {
                if (user?._id !== member._id) {
                  if (onlineUsers.includes(member._id)) {
                    return <p key={member?._id}>{member?.name}*</p>;
                  } else {
                    return <p key={member?._id}>{member?.name}</p>;
                  }
                }
              })}
            </div>
          </>
        ) : (
          <div>
            {groupMembers?.map((member: MEMBER) => {
              if (member?.role !== "ADMIN" && user?._id !== member?._id) {
                if (onlineUsers.includes(member._id)) {
                  console.log("coming.....", member._id, onlineUsers);
                  return <p key={member?._id}>{member?.name}*</p>;
                } else {
                  return <p key={member?._id}>{member?.name}</p>;
                }
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Right__Nav_Bar;

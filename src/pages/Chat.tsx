import React, { useEffect, useState } from "react";
import Send_Message_Input from "@/components/normal/Send_Message_Input";
import Auth_Layout from "@/components/normal/Auth_Layout";
import useSocketStore from "@/stores/Socket.store";
import Left_Nav_Bar from "@/components/headers/left/Left_Nav_Bar";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useUserStore from "@/stores/User.store";
import { AuthUser } from "@/types";
import useObserver from "@/hooks/useObserver";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { connect, disConnect } = useSocketStore();

  useEffect(() => {
    console.log("Coming...");
    connect();
    return () => {
      disConnect();
    };
  }, [connect, disConnect]);

  // get all user
  const { users, setUsers } = useUserStore();
  const { loading, data, hasMore, isError } = useInfiniteScroll<
    Partial<AuthUser>
  >({
    pageNumber: pageNumber,
    url: "users",
    data: users,
    setData: setUsers,
  });
  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

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
          <div className="h-[calc(100%-7rem)] bg-red-500  overflow-y-auto p-4 flex flex-col gap-4">
            {data &&
              data.map((user: Partial<AuthUser>, index: number) => {
                if (data?.length === index + 1) {
                  return (
                    <div
                      ref={lastBookElementRef}
                      key={user._id}
                      className="h-[4rem] px-4 border-2"
                    >
                      {user?.name}
                    </div>
                  );
                } else {
                  return (
                    <div key={user._id} className="h-[2rem] px-4 border-2">
                      {user?.name}
                    </div>
                  );
                }
              })}

            <div>{loading && "Loading..."}</div>
            <div>{isError && "Error"}</div>
          </div>
        </div>
        <div className="bg-yellow-300 w-[calc(100%-25rem)] relative">
          <div className="h-[4rem] bg-pink-300">
            <h1>left navbar</h1>
          </div>
          <div className="h-[calc(100%-8rem)] overflow-y-auto">
            <div>
              <p>Chats</p>
            </div>
          </div>
          <Send_Message_Input message={message} setMessage={setMessage} />
        </div>
      </main>
    </Auth_Layout>
  );
};

export default Chat;

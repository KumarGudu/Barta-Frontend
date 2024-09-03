import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useObserver from "@/hooks/useObserver";
import { ConnectedChat } from "@/types";
import React, { useState } from "react";

const All_Connected_Chat = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<any>(null);
  const [text, setText] = useState<string>("");

  // api call
  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<ConnectedChat>
  >({
    pageNumber: pageNumber,
    url: "chat/get-all-connected",
    query: searchQuery,
  });

  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

  return (
    <div>
      {resData &&
        resData.map((connectedChat: ConnectedChat, index: number) => {
          if (resData?.length === index + 1) {
            return (
              <div
                ref={lastBookElementRef}
                key={connectedChat?._id}
                className="h-[3rem] w-full bg-white"
              >
                <p>{connectedChat?.name}</p>
              </div>
            );
          } else {
            return (
              <div
                key={connectedChat?._id}
                className="h-[3rem] w-full bg-white"
              >
                <p>{connectedChat?.name}</p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default All_Connected_Chat;

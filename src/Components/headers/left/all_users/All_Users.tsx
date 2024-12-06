import React, { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import useUserStore from "@/stores/User.store";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AuthUser } from "@/types";
import useObserver from "@/hooks/useObserver";
import { BiSearch, BiX } from "react-icons/bi";
import User_Card from "./User_Card";

const All_Users = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const { users, setUsers } = useUserStore();

  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<AuthUser>
  >({
    pageNumber: pageNumber,
    url: "users?isShomes=true",
    data: users,
    setData: setUsers,
    isOpen: open,
    query: searchQuery,
  });

  useEffect(() => {
    if (resData.length === 0) {
      setPageNumber(1);
    }
  }, [resData]);

  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

  const handleChange = (e: any) => {
    setText(e?.target?.value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      classes={{
        paper: "w-full h-full sm:w-[28rem] sm:max-h-[100%]",
      }}
    >
      <div className="relative h-full">
        {/* Search Header */}
        <div className="sticky top-0 h-[4rem] z-10 flex items-center bg-white px-2">
          <div className="flex items-center w-full border-2 rounded-lg border-gray-400 px-1 py-1 sm:py-2 sm:px-2">
            <input
              type="text"
              value={text}
              placeholder="Search for user"
              className="flex-grow h-full px-2 py-1 text-sm sm:text-base outline-none border-none"
              onChange={handleChange}
            />
            <button
              className="flex justify-center items-center text-gray-500 hover:text-gray-700"
              onClick={() => handleSearch(text)}
            >
              <BiSearch size={23} />
            </button>
          </div>
          {/* Close Button for Small Screens */}
          <button
            className="ml-2 sm:hidden flex justify-center items-center text-gray-500 hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            <BiX size={23} />
          </button>
        </div>

        {/* Users List */}
        <div className="w-full max-h-[calc(100%-4rem)] overflow-y-auto px-1 flex flex-col gap-2">
          {resData &&
            resData.map((user: Partial<AuthUser>, index: number) => {
              if (resData?.length === index + 1) {
                return (
                  <div ref={lastBookElementRef} key={user._id}>
                    <User_Card
                      name={user?.name}
                      slugName={user?.slugName}
                      profile={user?.profileUrl}
                      id={user?._id}
                      setOpen={setOpen}
                    />
                  </div>
                );
              } else {
                return (
                  <User_Card
                    key={user?._id}
                    name={user?.name}
                    slugName={user?.slugName}
                    profile={user?.profileUrl}
                    id={user?._id}
                    setOpen={setOpen}
                  />
                );
              }
            })}

          {loading && (
            <div className="h-[3rem]">
              <p>Loading..</p>
            </div>
          )}

          {isError && (
            <div className="h-[3rem]">
              <p>Error</p>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default All_Users;

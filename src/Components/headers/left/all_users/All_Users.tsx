import React, { useEffect, useState } from "react";
import { AddBox } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import useUserStore from "@/stores/User.store";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AuthUser } from "@/types";
import useObserver from "@/hooks/useObserver";
import { BiSearch } from "react-icons/bi";
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
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div className="relative h-full">
        <div className="sticky top-0 h-[4rem] z-10 flex items-center">
          <div className="h-[70%] w-full px-2 py-1 flex justify-center items-center border-2 rounded-lg mx-3 my-2 border-gray-400">
            <div className="w-[90%] bg-green-300">
              <input
                type="text"
                value={text}
                placeholder="Search for user"
                className="h-full px-2 py-2 outline-none border-none w-full text-sm"
                onChange={handleChange}
              />
            </div>
            <div
              className="w-[10%] h-full flex justify-center items-center"
              onClick={() => handleSearch(text)}
            >
              <BiSearch size={23} />
            </div>
          </div>
        </div>
        <div className="w-[27.9rem] max-h-[calc(100%-4rem)] overflow-y-auto px-1 flex flex-col gap-2">
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

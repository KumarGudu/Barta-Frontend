import React, { useEffect, useState } from "react";
import { AddBox } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import useUserStore from "@/stores/User.store";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AuthUser } from "@/types";
import useObserver from "@/hooks/useObserver";

const All_Users = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { users, setUsers } = useUserStore();
  const { loading, data, hasMore, isError } = useInfiniteScroll<
    Partial<AuthUser>
  >({
    pageNumber: pageNumber,
    url: "users",
    data: users,
    setData: setUsers,
    isOpen: open,
  });
  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div className="relative h-full">
        <div className="sticky top-0 h-[2rem] bg-slate-400 z-10">
          <input type="text" className="" />
        </div>
        <div className="w-[24.9rem] max-h-[calc(100%-2rem)] overflow-y-auto">
          {data &&
            data.map((user: Partial<AuthUser>, index: number) => {
              if (data?.length === index + 1) {
                return (
                  <div
                    ref={lastBookElementRef}
                    key={user._id}
                    className="h-[10rem] px-4 border-2"
                  >
                    {user?.name}
                  </div>
                );
              } else {
                return (
                  <div key={user._id} className="h-[10rem] px-4 border-2">
                    {user?.name}
                  </div>
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

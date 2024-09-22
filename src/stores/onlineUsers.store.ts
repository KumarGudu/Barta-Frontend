import { create } from "zustand";

type OnlineUsersState = {
  onlineUsers: string[];
};

type OnlineUsersActions = {
  setOnlineUsers: (onlineUsers: string[]) => void;
};

const useOnlineUsersStore = create<OnlineUsersState & OnlineUsersActions>(
  (set) => ({
    onlineUsers: [],
    setOnlineUsers: (onlineUsers) => {
      set((state) => ({
        onlineUsers: onlineUsers,
      }));
    },
  })
);

export default useOnlineUsersStore;

import { AuthUser } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UserState = {
  users: Partial<AuthUser>[];
};

type UserAction = {
  setUsers: (users: Partial<AuthUser>[]) => void;
};

const useUserStore = create<UserState & UserAction>()(
  immer((set) => ({
    users: [],
    setUsers: (users: Partial<AuthUser>[]) => {
      set((state) => {
        state.users = users;
      });
    },
  }))
);

export default useUserStore;

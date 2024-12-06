// stores/Layout.store.ts
import { create } from "zustand";

type LayoutState = {
  screen: "userList" | "chatScreen";
  isLargeScreen: boolean;
  setScreen: (screen: "userList" | "chatScreen") => void;
  setIsLargeScreen: (isLargeScreen: boolean) => void;
};

const useLayoutStore = create<LayoutState>((set) => ({
  screen: "userList",
  isLargeScreen: false,
  setScreen: (screen) => set({ screen }),
  setIsLargeScreen: (isLargeScreen) => set({ isLargeScreen }),
}));

export default useLayoutStore;

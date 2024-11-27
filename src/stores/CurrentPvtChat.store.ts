import { PrivateChatRoom } from "@/types";
import { create } from "zustand";

type CurrentPvtChatRoomState = {
  currentRoom?: PrivateChatRoom;
  chatMutate?: () => void;
};

type CurrentPvtChatRoomAction = {
  setCurrentRoom: (chatRoom: PrivateChatRoom) => void;
  refreshCurrentRoom: () => void;
  setChatMutate: (newFunction: () => void) => void;
};

const useCurrentPrivateChatRoomStore = create<
  CurrentPvtChatRoomState & CurrentPvtChatRoomAction
>((set, get) => ({
  currentRoom: undefined,
  chatMutate: undefined,
  setCurrentRoom: (chatRoom: PrivateChatRoom) => {
    set({
      currentRoom: { ...chatRoom },
    });
  },
  refreshCurrentRoom: () => {
    const currentRoom = get().currentRoom;
    set({
      currentRoom: { ...currentRoom },
    });
  },
  setChatMutate: (newFunction) =>
    set((state) => ({
      ...state,
      chatMutate: newFunction,
    })),
}));

export default useCurrentPrivateChatRoomStore;

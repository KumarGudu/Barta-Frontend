import { PrivateChatRoom } from "@/types";
import { create } from "zustand";

type CurrentPvtChatRoomState = {
  currentRoom?: PrivateChatRoom;
};

type CurrentPvtChatRoomAction = {
  setCurrentRoom: (chatRoom: PrivateChatRoom) => void;
  refreshCurrentRoom: () => void;
};

const useCurrentPrivateChatRoomStore = create<
  CurrentPvtChatRoomState & CurrentPvtChatRoomAction
>((set, get) => ({
  currentRoom: undefined,
  setCurrentRoom: (chatRoom: PrivateChatRoom) => {
    set({
      currentRoom: { ...chatRoom },
    });
  },
  refreshCurrentRoom: () => {
    console.log("COMING.........");
    const currentRoom = get().currentRoom;
    set({
      currentRoom: { ...currentRoom },
    });
  },
}));

export default useCurrentPrivateChatRoomStore;

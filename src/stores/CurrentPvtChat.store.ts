import { PrivateChatRoom } from "@/types";
import { create } from "zustand";

type CurrentPvtChatRoomState = {
  currentRoom?: PrivateChatRoom;
};

type CurrentPvtChatRoomAction = {
  setCurrentRoom: (chatRoom: PrivateChatRoom) => void;
};

const useCurrentPrivateChatRoomStore = create<
  CurrentPvtChatRoomState & CurrentPvtChatRoomAction
>((set) => ({
  setCurrentRoom: (chatRoom: PrivateChatRoom) => {
    set({
      currentRoom: { ...chatRoom },
    });
  },
}));

export default useCurrentPrivateChatRoomStore;

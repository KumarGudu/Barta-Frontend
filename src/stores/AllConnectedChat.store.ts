import { create } from "zustand";

type ConnectedChatState = {
  connectedChatMutate: (() => void) | null;
};

type ConnectedChatAction = {
  SetConnectedChatMutate: (fn: () => void) => void;
};

const useConnectedChatStore = create<ConnectedChatState & ConnectedChatAction>(
  (set) => ({
    connectedChatMutate: null,
    SetConnectedChatMutate: (fn) => {
      console.log("FN", fn);
      set(() => ({ connectedChatMutate: fn }));
    },
  })
);

export default useConnectedChatStore;

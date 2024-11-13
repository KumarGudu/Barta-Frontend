import { LiveMsg } from "@/types";
import { create } from "zustand";

type LiveMsgType = {
  messages: LiveMsg[];
  isLiveMessageAdded: boolean;
};

type LiveMsgAction = {
  setLiveMessage: (message: LiveMsg) => void;
  setLiveMessages: (newMessages: LiveMsg[]) => void;
  updateMessage: (tempId: string, dbMessage: LiveMsg) => void;
  setIsLiveMessageAdded: (isLiveMessageAdded: boolean) => void;
};

const useLiveMessageStore = create<LiveMsgType & LiveMsgAction>((set) => ({
  messages: [],
  isLiveMessageAdded: false,
  setLiveMessages: (newMessages) => set({ messages: newMessages }),
  setLiveMessage: (msg: LiveMsg) => {
    set((state) => ({
      messages: [msg, ...state.messages],
    }));
  },
  setIsLiveMessageAdded: (isLiveMessageAdded: boolean) =>
    set({ isLiveMessageAdded: isLiveMessageAdded }),
  chatMutate: (newFunction) =>
    set((state) => ({
      ...state,
      myFunction: newFunction,
    })),
  updateMessage: (tempId, dbMessage) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg._id === tempId ? { ...msg, ...dbMessage } : msg
      ),
    })),
}));

export default useLiveMessageStore;

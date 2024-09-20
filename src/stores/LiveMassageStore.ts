import { LiveMsg } from "@/types";
import { create } from "zustand";

type LiveMsgType = {
  messages: LiveMsg[];
};

type LiveMsgAction = {
  setLiveMessage: (message: LiveMsg) => void;
  setLiveMessages: (newMessages: LiveMsg[]) => void;
};

const useLiveMessageStore = create<LiveMsgType & LiveMsgAction>((set) => ({
  messages: [],

  setLiveMessages: (newMessages) => set({ messages: newMessages }),

  setLiveMessage: (msg: LiveMsg) => {
    set((state) => ({
      messages: [msg, ...state.messages],
    }));
  },
}));

export default useLiveMessageStore;

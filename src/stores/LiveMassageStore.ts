import { LiveMsg } from "@/types";
import { create } from "zustand";

type LiveMsgType = {
  messages: LiveMsg[];
};

type LiveMsgAction = {
  setLiveMessage: (message: LiveMsg) => void;
};

const useLiveMessageStore = create<LiveMsgType & LiveMsgAction>((set) => ({
  messages: [],
  setLiveMessage: (msg: LiveMsg) => {
    set((state) => ({
      messages: [...state.messages, msg],
    }));
  },
}));

export default useLiveMessageStore;

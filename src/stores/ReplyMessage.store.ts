import { ReplyMsgType } from "@/types";
import { create } from "zustand";

type ReplyMessageType = {
  message: ReplyMsgType | null;
};

type ReplyMessageAction = {
  setReplyMessage: (message: ReplyMsgType) => void;
};

const useReplyMessageStore = create<ReplyMessageType & ReplyMessageAction>(
  (set) => ({
    message: null,
    setReplyMessage: (message) => set({ message }),
  })
);

export default useReplyMessageStore;

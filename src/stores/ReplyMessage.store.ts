import { ReplyMsgType } from "@/types";
import { create } from "zustand";

type ReplyMessageType = {
  message: ReplyMsgType | null;
  isMessageDeleted: boolean;
};

type ReplyMessageAction = {
  setReplyMessage: (message: ReplyMsgType) => void;
  setIsMessageDeleted: (isMessageDeleted: boolean) => void;
};

const useReplyMessageStore = create<ReplyMessageType & ReplyMessageAction>(
  (set) => ({
    message: null,
    isMessageDeleted: false,
    setIsMessageDeleted: (isMessageDeleted) => set({ isMessageDeleted }),
    setReplyMessage: (message) => set({ message }),
  })
);

export default useReplyMessageStore;

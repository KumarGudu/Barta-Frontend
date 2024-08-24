import { create } from "zustand";

type ChatGroupStore = {};

type ChatGroupAction = {};

const useChatGroupStore = create<ChatGroupStore & ChatGroupAction>(
  (set) => ({})
);

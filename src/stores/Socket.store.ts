import { create } from "zustand";
import io, { Socket } from "socket.io-client";
import { socket } from "@/hooks/Socket";

type SocketState = {
  socket: Socket | null;
};

type SocketAction = {
  connect: () => void;
  disConnect: () => void;
};

const useSocketStore = create<SocketState & SocketAction>((set) => ({
  socket: null,
  connect: () => {
    set({ socket });
  },

  disConnect: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));

export default useSocketStore;

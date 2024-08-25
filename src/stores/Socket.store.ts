import { create } from "zustand";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@/types";

type SocketState = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
};

type SocketAction = {
  connect: (
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  ) => void;
  disConnect: () => void;
};

const useSocketStore = create<SocketState & SocketAction>((set) => ({
  socket: null,
  connect: (socket) => {
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

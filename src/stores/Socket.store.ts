import { create } from "zustand";
import io, { Socket } from "socket.io-client";
import { BASE_URL } from "@/utils";

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
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    console.log({ socket });
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

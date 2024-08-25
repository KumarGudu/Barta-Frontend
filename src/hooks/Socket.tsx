import { useMemo } from "react";
import { io } from "socket.io-client";

const BASE_SOCKET_URL = "http://localhost:5000";

export const useSocket = () => {
  const socket = useMemo(() => {
    const newSocket = io(BASE_SOCKET_URL, { withCredentials: true });
    return newSocket;
  }, [BASE_SOCKET_URL]);

  return socket;
};

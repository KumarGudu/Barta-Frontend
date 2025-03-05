import { useMemo } from "react";
import { io, Socket } from "socket.io-client";

const BASE_SOCKET_URL = "http://localhost:3300";
// const BASE_SOCKET_URL = "https://api.shomes.in";

export const useSocket = () => {
  const socket = useMemo<Socket | null>(() => {
    if (typeof window === "undefined") {
      // Prevent execution during server-side rendering
      return null;
    }

    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")!)
      : null;

    if (!token) {
      console.warn("Token not found in localStorage");
      return null;
    }

    const newSocket = io(BASE_SOCKET_URL, {
      withCredentials: true,
      extraHeaders: {
        "x-access-token": token,
      },
    });

    return newSocket;
  }, []); // BASE_SOCKET_URL does not need to be in the dependency array since it is a constant

  return socket;
};

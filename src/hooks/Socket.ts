import { io } from "socket.io-client";

const BASE_SOCKET_URL = "http://localhost:5000";

export const socket = io(BASE_SOCKET_URL, { withCredentials: true });

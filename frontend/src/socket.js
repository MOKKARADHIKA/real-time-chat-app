import { io } from "socket.io-client";

const socket = io(
  "https://real-time-chat-app-production-864f.up.railway.app",
  {
    transports: ["websocket"]
  }
);

export default socket;
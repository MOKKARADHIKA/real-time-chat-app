// import { io } from "socket.io-client";

// const socket = io(
//   "https://real-time-chat-app-production-864f.up.railway.app",
//   {
//     transports: ["websocket"]
//   }
// );

// export default socket;

import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

export default socket;
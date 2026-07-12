// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://real-time-chat-app-production-864f.up.railway.app"
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default API;
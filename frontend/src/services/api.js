import axios from "axios";

const API = axios.create({
  baseURL: "https://real-time-chat-app-production-864f.up.railway.app"
});

export default API;
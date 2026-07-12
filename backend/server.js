require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make io available in controllers
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// Socket Connection
io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
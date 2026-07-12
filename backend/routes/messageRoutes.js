const express = require("express");
const router = express.Router();

const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");

// Get all messages
router.get("/", getMessages);

// Send a message
router.post("/", sendMessage);

module.exports = router;
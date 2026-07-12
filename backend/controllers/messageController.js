const Message = require("../models/Message");

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      return res.status(400).json({
        message: "Username and message are required",
      });
    }

    const newMessage = await Message.create({
      username,
      text,
    });

    // Send message to all connected users
    const io = req.app.get("io");
    io.emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
const mongoose = require("mongoose");

const userSchema = require("./user");
const chatSchema = require("./chat");
const messageSchema = require("./message");
const requestSchema = require("./request");

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);
const Request = mongoose.model("Request", requestSchema);

module.exports = {
  User,
  Chat,
  Message,
  Request,
};

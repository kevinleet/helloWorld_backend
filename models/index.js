const mongoose = require("mongoose");

const userSchema = require("./user");
const chatSchema = require("./chat");

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);

module.exports = {
  User,
  Chat,
};

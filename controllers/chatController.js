const { Chat } = require("../models");

const getAllChats = async (req, res) => {
  try {
    let chats = await Chat.find().populate({path: 'users', ref: 'User'});
    res.json(chats);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllChats,
};

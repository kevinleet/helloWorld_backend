const { Message } = require("../models");

const getAllMessages = async (req, res) => {
  try {
    let messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllMessages,
};

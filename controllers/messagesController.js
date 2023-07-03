const { Message, User, Chat } = require("../models");


const getAllMessages = async (req, res) => {
  try {
    let messages = await Message.find({chat: req.params.chatId});
    res.json(messages);
  } catch (error) {
    res.send(error);
  }
};

const sendMessage = async (req, res) => {
  const { sender, content, chat } = req.body;

  let newMessage = {
    sender: sender,
    content: content,
    chat: chat,
  }

  try {
    let message = await Message.create(newMessage)
    // message = await message.populate('sender').exec()
    // message = await message.populate('chat').exec()
    console.log(message)
    res.send(message)
  } catch (error) {
    res.status(400)
  }
}



module.exports = {
  getAllMessages,
  sendMessage
};

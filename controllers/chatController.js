const { Chat } = require("../models");

const getAllChats = async (req, res) => {
  try {
    let chats = await Chat.find().populate({path: 'users'});
    res.json(chats);
  } catch (error) {
    res.send(error);
  }
};

const getChatsByUser = async (req, res) => {
  const { userId } = req.params
  console.log(userId)
  try {
    let chats = await Chat.find({ users: { $elemMatch: { $eq: '64a30f76c98654a8e7693d51' } } }).populate(['users', 'latestMessage'])
    console.log('chats:', chats)
    res.json(chats)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getAllChats,
  getChatsByUser
};

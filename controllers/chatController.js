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
    let chats = await Chat.find({ users: { $elemMatch: { $eq: '64a02d55d8ecc769e13dfc1d' } } }).populate(['users', 'latestMessage'])
    // chats = await User.populate(chats, {
    //   path: "latestMessage.sender",
    //   //select: "name pic email",
    // });
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

const { Chat, User } = require("../models");

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
    let chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users')
      .populate({ path: 'latestMessage' , populate: { path: 'sender', select: 'email displayname' } });
   
    console.log('chats:', chats)
    console.log('')
    res.json(chats)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getAllChats,
  getChatsByUser
};

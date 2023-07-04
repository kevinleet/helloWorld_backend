const { Request, User } = require("../models/");

const createRequest = async (req, res) => {
  try {
    let { sender, recipient } = req.body;
    let newRequest = await Request.create({
      sender: sender,
      recipient: recipient,
    });
    let senderUser = await User.findOneAndUpdate(
      {
        _id: sender,
      },
      { $push: { outgoingrequests: recipient } }
    );
    let recipientUser = await User.findOneAndUpdate(
      {
        _id: recipient,
      },
      { $push: { incomingrequests: sender } }
    );
    res.send(newRequest);
  } catch (error) {
    res.send(error);
  }
};

const acceptRequest = async (req, res) => {
  try {
    let { sender, recipient } = req.body;
    let deletedRequest = await Request.findOneAndDelete({
      sender: sender,
      recipient: recipient,
    });
    let senderUser = await User.findOneAndUpdate(
      {
        _id: sender,
      },
      { $pull: { outgoingrequests: recipient }, $push: { friends: recipient } }
    );
    let recipientUser = await User.findOneAndUpdate(
      {
        _id: recipient,
      },
      { $pull: { incomingrequests: sender }, $push: { friends: sender } }
    );
    res.send(deletedRequest);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createRequest,
  acceptRequest,
};

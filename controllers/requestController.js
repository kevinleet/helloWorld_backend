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

module.exports = {
  createRequest,
};

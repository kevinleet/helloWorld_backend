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

    // Remove recipient from sender's outgoingrequests and add to friends if not already present
    let senderUser = await User.findOneAndUpdate(
      {
        _id: sender,
        outgoingrequests: recipient, // Only remove if recipient is present in outgoingrequests
        friends: { $ne: recipient }, // Add to friends only if recipient is not already present
      },
      {
        $pull: { outgoingrequests: recipient },
        $push: { friends: recipient },
      }
    );

    // Remove sender from recipient's incomingrequests and add to friends if not already present
    let recipientUser = await User.findOneAndUpdate(
      {
        _id: recipient,
        incomingrequests: sender, // Only remove if sender is present in incomingrequests
        friends: { $ne: sender }, // Add to friends only if sender is not already present
      },
      {
        $pull: { incomingrequests: sender },
        $push: { friends: sender },
      }
    );

    let deletedRequest = await Request.findOneAndDelete({
      sender: sender,
      recipient: recipient,
    });

    res.send(deletedRequest);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createRequest,
  acceptRequest,
};

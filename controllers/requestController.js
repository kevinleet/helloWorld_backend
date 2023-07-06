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

    // Remove sender from recipient's incomingrequests
    let recipientUser = await User.findOneAndUpdate(
      {
        _id: recipient,
        incomingrequests: sender, // Only remove if sender is present in incomingrequests
      },
      {
        $pull: { incomingrequests: sender },
      }
    );

    // Add sender to recipient's friends if not already present
    if (!recipientUser.friends.includes(sender)) {
      recipientUser = await User.findOneAndUpdate(
        {
          _id: recipient,
        },
        {
          $push: { friends: sender },
        },
        { new: true } // To get the updated recipientUser object
      );
    }

    // Remove recipient from sender's outgoingrequests
    let senderUser = await User.findOneAndUpdate(
      {
        _id: sender,
        outgoingrequests: recipient, // Only remove if recipient is present in outgoingrequests
      },
      {
        $pull: { outgoingrequests: recipient },
      }
    );

    // Add recipient to sender's friends if not already present
    if (!senderUser.friends.includes(recipient)) {
      senderUser = await User.findOneAndUpdate(
        {
          _id: sender,
        },
        {
          $push: { friends: recipient },
        },
        { new: true } // To get the updated senderUser object
      );
    }

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

const { User } = require("../models");
const { Chat } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).populate({
      path: "incomingrequests outgoingrequests friends",
      // populate: { path: "outgoingrequests" },
    });
    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    res.json(user)
  } catch (error) {
    res.send(error)
  }
}

const createUser = async (req, res) => {
  try {
    let newUser = await User.create({
      email: req.body.email,
      displayname: req.body.displayname,
      password: req.body.password,
    });
    res.send(newUser);
  } catch (error) {
    res.send(error);
  }
};

const updateDisplayName = async (req, res) => {
  try {
    const { userToUpdate } = req.params
    const { newDisplayName } = req.body

    const updatedUser = await User.findOneAndUpdate(
      { _id: userToUpdate },
      { displayname: newDisplayName },
      { new: true }
    )

    if(!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(updatedUser)
  } catch(error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

const updateEmail = async (req, res) => {
  try {
    const { emailToUpdate } = req.params
    const { newEmail } = req.body

    const updatedUser = await User.findOneAndUpdate(
      { _id: emailToUpdate },
      { email: newEmail },
      { new: true }
    )

    if(!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(updatedUser)
  } catch(error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { userToDelete } = req.params
    let userId = userToDelete

    const usersToUpdate = await User.find({ friends: userId })

    const updatePromises = usersToUpdate.map((user) => User.updateOne({ _id: user._id }, { $pull: {friends: userId } })
    )

    await Promise.all(updatePromises)

    const chatsToDelete = await Chat.deleteMany({ users: userId })

    const userData = await User.deleteOne({ _id: userId})
    if(!userData) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(`This account has been deleted!`)

  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateDisplayName,
  updateEmail,
  deleteUser
};
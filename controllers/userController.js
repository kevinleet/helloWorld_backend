const { User } = require("../models");

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

const deleteUser = async (req, res) => {
  try {
    const { userToDelete } = req.params
    let userEmail = userToDelete

    console.log(userEmail)

    const userData = await User.deleteOne({ email: userEmail})
    if(!userData) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(`${userEmail}'s account has been deleted!`)

  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  deleteUser
};
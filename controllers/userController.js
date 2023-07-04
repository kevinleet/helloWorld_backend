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

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
};

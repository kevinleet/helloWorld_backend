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
    let user = await User.find({ email: req.body.email });
    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
};

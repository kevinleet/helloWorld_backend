const express = require("express");
const Router = express.Router();
const controller = require("../controllers/userController");

Router.get("/", controller.getAllUsers);
Router.get("/email", controller.getUserByEmail);

module.exports = Router;

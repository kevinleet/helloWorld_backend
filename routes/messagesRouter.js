const express = require("express");
const Router = express.Router();
const controller = require("../controllers/messagesController");

Router.get("/", controller.getAllMessages);

module.exports = Router;

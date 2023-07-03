const express = require("express");
const Router = express.Router();
const controller = require("../controllers/messagesController");

Router.get("/:chatId", controller.getAllMessages);
Router.post("/", controller.sendMessage);

module.exports = Router;

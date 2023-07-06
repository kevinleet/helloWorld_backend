const express = require("express");
const Router = express.Router();
const controller = require("../controllers/chatController");

Router.get("/", controller.getAllChats);
Router.get("/userchats/:userId", controller.getChatsByUser)
Router.post("/", controller.createChat)

module.exports = Router;

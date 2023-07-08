const express = require("express");
const Router = express.Router();
const controller = require("../controllers/chatController");

Router.get("/", controller.getAllChats);
Router.get("/userchats/:userId", controller.getChatsByUser)
Router.post("/", controller.createChat)
Router.post("/chatgpt", controller.createGPTChat)
Router.get("/chatgpt/:user", controller.getGPTchat)


module.exports = Router;

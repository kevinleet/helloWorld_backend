const express = require("express");
const Router = express.Router();

const UserRouter = require("./userRouter");
const ChatRouter = require("./chatRouter");
const MessagesRouter = require("./messagesRouter");

Router.use("/users", UserRouter);
Router.use("/chats", ChatRouter);
Router.use("/messages", MessagesRouter);

module.exports = Router;

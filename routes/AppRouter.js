const express = require("express");
const Router = express.Router();

const UserRouter = require("./userRouter");
const ChatRouter = require("./chatRouter");

Router.use("/users", UserRouter);
Router.use("/chats", ChatRouter);

module.exports = Router;

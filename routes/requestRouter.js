const express = require("express");
const Router = express.Router();
const controller = require("../controllers/requestController");

Router.post("/create", controller.createRequest);
Router.post("/accept", controller.acceptRequest);

module.exports = Router;

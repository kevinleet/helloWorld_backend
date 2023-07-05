const express = require("express");
const Router = express.Router();
const controller = require("../controllers/userController");

Router.get("/get/all", controller.getAllUsers);
Router.post("/get/email", controller.getUserByEmail);

Router.post("/create", controller.createUser);
Router.put("/update/:userToUpdate", controller.updateDisplayName)
Router.delete("/delete/:userToDelete", controller.deleteUser)

module.exports = Router;

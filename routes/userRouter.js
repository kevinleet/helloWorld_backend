const express = require("express");
const Router = express.Router();
const controller = require("../controllers/userController");

Router.get("/get/all", controller.getAllUsers);
Router.get("/get/:id", controller.getUserById)
Router.post("/get/email", controller.getUserByEmail);

Router.post("/create", controller.createUser);
Router.put("/update/displayname/:userToUpdate", controller.updateDisplayName)
Router.put("/update/:emailToUpdate", controller.updateEmail)
Router.delete("/delete/:userToDelete", controller.deleteUser)

module.exports = Router;

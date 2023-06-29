const mongoose = require("mongoose");
const { MONGO_PW } = require("../config");

let MONGODB_URI = `mongodb+srv://kevinli617:${MONGO_PW}@cluster0.yg9kt7s.mongodb.net/Project3?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to remote MongoDB.");
  })
  .catch((e) => {
    console.log(`Connection Error: ${e.message}`);
  });

mongoose.set("debug", true);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB Connection Error:")
);

module.exports = mongoose.connection;

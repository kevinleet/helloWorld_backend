const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    displayname: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = userSchema;

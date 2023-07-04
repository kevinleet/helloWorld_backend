const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    displayname: { type: String, required: true },
    incomingrequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    outgoingrequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = userSchema;

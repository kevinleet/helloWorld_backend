const { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" }
  },
  { timestamps: true }
);

module.exports = messageSchema;

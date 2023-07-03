const { Schema } = require("mongoose");

const chatSchema = new Schema(
  {
    messages: [{ type: String, required: true }],
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

module.exports = chatSchema;

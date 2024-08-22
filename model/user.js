const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   for subscription
  status: {
    type: String,
    enum: ["free", "weekly", "monthly"],
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);

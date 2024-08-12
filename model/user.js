const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: String,
  },
  password: {
    type: String,
    required: String,
  },
//   for subscription
  status: {
    type: String,
    required: String,
  },
});

module.exports = mongoose.model("User", userSchema);

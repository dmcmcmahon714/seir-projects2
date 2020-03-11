const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  password: String,
  name: String,
  type: String,
  pain: Number,
  date: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
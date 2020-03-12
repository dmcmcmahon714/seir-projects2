const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: String,
  type: String,
  level: String,
  date: String
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

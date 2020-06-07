const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: String,
  type: String,
  level: Number,
  date: Date
});

const Log = mongoose.model("Log", logSchema);



module.exports = Log;

const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true},
  pain: { type: Number, required: true, max: 10 },
});

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;
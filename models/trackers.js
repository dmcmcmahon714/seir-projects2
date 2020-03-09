const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true},
  pain: { type: Number, required: false, max: 10},
},
    {timestamps: true}

);

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;
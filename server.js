const express = require("express");
const app = express();
const methodOverride = require("method-override");

// Load up mongoose npm as mongoose:
const mongoose = require("mongoose");
// allows server to review json data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// your own custom middleware
app.use((req, res, next) => {
  console.log("my own middleware");
  next();
});

// Connect mongoose to mongo db:
mongoose.connect("mongodb://localhost:27017/trackersdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

const trackersController = require("./controllers/trackers.js");
// any routes that come in for trackers should be sent
// to the trackersController
app.use("/trackers", trackersController);

app.get("/", (req, res) => {
  res.redirect("/trackers");
});

// wildcard route
app.get("*", (req, res) => {
  res.redirect("/trackers");
});

// Web server:
app.listen(3000, () => {
  console.log("listening");
});
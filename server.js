const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/authexampleapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.use(
  session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);

app.get("/", (req, res)=>{
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});


app.post("/", (req, res) => {
  res.render("show.ejs", {
    currentUser: req.session.currentUser
  });
});

// How to use the currentUser to store in the db:
//
// app.post("/articles", (req, res) => {
//   req.body.author = req.session.currentUser.username;
//   Article.create(req.body, (err, createdArticle) => {
//     res.redirect("/articles");
//   });
// });

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const logsController = require("./controllers/logs.js");
// any routes that come in for fruits should be sent
// to the fruitsContoller
app.use("/logs", logsController);

app.listen(3000, () => {
  console.log("listening...");
});

//logs/new?
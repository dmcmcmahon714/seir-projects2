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

const Log = require("./models/logs.js");

app.use(express.static(__dirname + '/public'));

app.use(
  session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const logsController = require("./controllers/logs.js");
// any routes that come in for fruits should be sent
// to the fruitsContoller
app.use("/logs", logsController);

//LOG IN SCREEN 

app.get("/", (req, res)=>{
  if(req.session.currentUser){
    Log.find({userId: req.session.currentUser._id},(err, foundLogs)=>{
      console.log(foundLogs)
      res.render("index.ejs", {
        currentUser: req.session.currentUser, logs: foundLogs
      })
    })  
  } else {
    res.render("index.ejs", {
      currentUser: req.session.currentUser, logs: null
    });  
  }
});

// app.get('/app', (req, res)=>{    
//   if(req.session.currentUser){        
//     res.render("./logs/new.ejs")    
//     } else {        
//       res.redirect('/sessions/new');    
//     }});

// app.post("/", (req, res) => {
//   res.render("show.ejs", {
//     currentUser: req.session.currentUser
//   });
// });

// How to use the currentUser to store in the db:
//
// app.post("/articles", (req, res) => {
//   req.body.author = req.session.currentUser.username;
//   Article.create(req.body, (err, createdArticle) => {
//     res.redirect("/articles");
//   });
// });



app.listen(3000, () => {
  console.log("listening...");
});
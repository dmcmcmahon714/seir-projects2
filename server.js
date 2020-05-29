const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mogodb://localhost:27017/authexampleapp'

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

db.on('error', (err) => console.log(err.message + 'is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on('open' , ()=>{});

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));


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



app.listen(PORT, () => console.log( 'Listening on port:', PORT));
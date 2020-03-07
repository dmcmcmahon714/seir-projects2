// Load express:
const express = require("express");
const app = express();

// Set the web server port:
const port = 3000;

// Load methodOverride middleware so you can make delete, put, and
// patch requests from web pages:
const methodOverride = require("method-override");

// const items = [{ name: "Xylox", description: "An astronaut" }];
const items = [];

// Load body parser middleware:
app.use(express.urlencoded({ extended: false }));

// Load methodOverride as middleware to support ?_method=<METHOD> query strings:
app.use(methodOverride("_method"));

// Define one or more routes:

// NEW
app.get("/items/new", (req, res) => {
  res.render("new.ejs");
});

// EDIT
app.get("/items/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    item: items[req.params.id],
    index: req.params.id
  });
});

// UPDATE
app.put("/items/:id", (req, res) => {
  items[req.params.id] = req.body;
  res.redirect("/items");
});

// SHOW
app.get("/items/:id", (req, res) => {
  res.render("show.ejs", { item: items[req.params.id] });
});

// DESTROY
app.delete("/items/:id", (req, res) => {
  items.splice(req.params.id, 1); //remove the item from the array
  res.redirect("/items"); //redirect to index page
});

// CREATE
app.post("/items/", (req, res) => {
  let index = items.push(req.body) - 1;
  res.redirect(`/items/${index}`);
});

// INDEX
app.get("/items/", (req, res) => {
  res.render("index.ejs", { items: items });
});

// WEB SERVER //
// Load up the express web server. IMPORTANT: Always do this at the end of your server.js:
app.listen(port, () => {
  console.log("listening on port", port);
});
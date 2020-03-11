const express = require("express");
const router = express.Router();
const Log = require("../models/logs.js");

// Routes:

// NEW
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE
router.post("/", (req, res) => {
  Log.create(req.body, (error, result) => {
    // res.send(result);
    res.redirect("/logs");
  });
});

// INDEX..aka SHOW ALL
router.get("/", (req, res) => {
  Log.find({}, (error, logs) => {
    res.render("logs/index.ejs", { logs });
  });
});

// // SECRET SEED ROUTE
router.get("/seed", (req, res) => {
  Log.create(
    [
      {
        type: "back pain",
        level: "6",
        date: "3-6-2020"
      },
      {
        type: "migraine",
        level: "4",
        date: "3-8-2020"
      },
      {
        type: "sciatica",
        level: "9",
        date: "2-22-2020"
      },
    ],
    (error, data) => {
      console.log(data);
      res.redirect("/logs");
    }
  );
});

// SHOW ONE
router.get("/:id", (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    res.render("show.ejs", {
      log: foundLog
    });
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  // res.send('deleting...')
  Log.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/logs");
  });
});

// EDIT
// /fruits/5e5a93cd12675b4c0efcb17e/edit
router.get("/:id/edit", (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    console.log("foundLog", foundLog);
    res.render("edit.ejs", {
      log: foundLog
    });
  });
});

// PUT/UPDATE
router.put("/:id", (req, res) => {
  Log.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateModel) => {
      // res.send(updateModel);
      res.redirect("/logs");
    }
  );
});

module.exports = router;
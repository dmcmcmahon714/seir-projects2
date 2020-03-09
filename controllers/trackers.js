const express = require("express");
const router = express.Router();
const Tracker = require("../models/trackers.js");

// Routes:

// NEW
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE
router.post("/", (req, res) => {
  Tracker.create(req.body, (error, result) => {
      console.log(error)
    // res.send(result);
    res.redirect("/trackers");
  });
});

// INDEX..aka SHOW ALL
router.get("/", (req, res) => {
  Tracker.find({}, (error, trackers) => {
    // res.send(trackers);
    res.render("index.ejs", { trackers });
  });
});

// SECRET SEED ROUTE
router.get("/seed", (req, res) => {
  Tracker.create(
    [
      {
        name: "Bob Smith",
        type: "migraine",
        pain: 8
      },
      {
        name: "Billy Idol",
        type: "lowback",
        pain: 6
      },
      {
        name: "Kilgore Trout",
        type: "Knee Joint",
        pain: 4
      }
    ],
    (error, data) => {
      console.log(data);
      res.redirect("/trackers");
    }
  );
});

// SHOW ONE
router.get("/:id", (req, res) => {
  Tracker.findById(req.params.id, (err, foundTracker) => {
    res.render("show.ejs", {
      tracker: foundTracker
    });
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  // res.send('deleting...')
  Tracker.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/trackers");
  });
});

// EDIT
// /trackers/5e5a93cd12675b4c0efcb17e/edit
router.get("/:id/edit", (req, res) => {
  Tracker.findById(req.params.id, (err, foundTracker) => {
    console.log("foundTracker", foundTracker);
    res.render("edit.ejs", {
      tracker: foundTracker
    });
  });
});

// PUT/UPDATE
router.put("/:id", (req, res) => {
  Tracker.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateModel) => {
      if (err) {
      } else {
        // res.send(updateModel);
        res.redirect("/trackers");
      }
    }
  );
});

module.exports = router;
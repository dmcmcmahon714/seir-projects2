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
    // res.send(fruits);
    res.render("index.ejs", { logs });
  });
});

// // SECRET SEED ROUTE
// router.get("/seed", (req, res) => {
//   Fruit.create(
//     [
//       {
//         name: "grapefruit",
//         color: "pink",
//         readyToEat: true
//       },
//       {
//         name: "grape",
//         color: "purple",
//         readyToEat: false
//       },
//       {
//         name: "avocado",
//         color: "green",
//         readyToEat: true
//       }
//     ],
//     (error, data) => {
//       console.log(data);
//       res.redirect("/fruits");
//     }
//   );
// });

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
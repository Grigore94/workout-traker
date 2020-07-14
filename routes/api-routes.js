const express = require("express");
const db = require("../models");

const router = express.Router();

//get request
router.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });

});

//post request
router.post("/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
});

//putrequest
router.put("/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      { useFindAndModify: false }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
});

//get request
router.get("/workouts/range", (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(7)
    .then(dbWorkouts => {
        res.json(dbWorkouts)
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;
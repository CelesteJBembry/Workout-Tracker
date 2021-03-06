const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

//routes main
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});
//    res.sendFile(path.join(__dirname, "../public/blog.html"));

app.get("/exercise", (req,res) => {
  res.sendFile(path.join(__dirname,'./public/exercise.html'))
});
app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname,'./public/stats.html'))
});

//new workout button
app.post("/api/workouts", (req,res) => {
  console.log(req)
  db.Workout.create({exercises: []})
  .then(dbWorkout => {
     res.json(dbWorkout);
})
});


app.put("/api/workouts/:id", (req, res) => {
  //db.Workout.findById(req.params.id)

  db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
   //.then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { type: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log(dbWorkout)
    })
    .catch(err => {
      res.json(err);
    });
  });

// //fetch(`/api/workouts/range`)
// //fetch("/api/workouts/" + id,

// // db.Workout.create({ name: "Fit Gym" })
// //   .then(dbWorkout => {  })
// //   .catch(({message}) => {
// //     console.log(message);
// //   });

// app.get("/api/workouts", (req, res) => {
//   db.Workout.find({})
//   .then(dbWorkout => {
//     res.json(dbWorkout);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });

// app.post("/api/workouts", (req, res) => {
//     db.Workout.create(body)
//    // .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { type: _id } }, { new: true }))
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.put("/api/workouts", (req, res) => {
//   db.Workout.update(body)
//  // .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { type: _id } }, { new: true }))
//   .then(dbWorkout => {
//     res.json(dbWorkout);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });






app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

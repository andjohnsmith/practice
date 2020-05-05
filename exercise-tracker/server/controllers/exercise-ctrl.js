const Exercise = require('../models/exercise-model');

createExercise = (req, res) => {
  // TODO: check for errors in req.body

  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  // const date = Date.parse(req.body.date);
  const date = new Date();

  const exercise = new Exercise({ username, description, duration, date });

  // TODO: check for errors in exercise

  exercise
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: exercise._id,
        message: 'Exercise created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: 'Exercise not created' });
    });
};

retrieveExercises = async (req, res) => {
  await Exercise.find({}, (err, exercises) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, exercises });
  }).catch((err) => console.log(err));
};

updateExercise = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Exercise.findOne({ _id: req.params.id }, (err, exercise) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Exercise not found!',
      });
    }
    exercise.username = body.username;
    exercise.description = body.description;
    exercise.duration = body.duration;
    exercise.date = body.date;
    exercise
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: exercise._id,
          message: 'Exercise updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Exercise not updated!',
        });
      });
  });
};

deleteExercise = async (req, res) => {
  await Exercise.findOneAndDelete({ _id: req.params.id }, (err, exercise) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!exercise) {
      return res
        .status(404)
        .json({ success: false, error: `Exercise not found` });
    }

    return res.status(200).json({ success: true, exercise });
  }).catch((err) => console.log(err));
};

module.exports = {
  createExercise,
  retrieveExercises,
  updateExercise,
  deleteExercise,
};

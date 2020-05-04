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

module.exports = {
  createExercise,
  retrieveExercises,
};

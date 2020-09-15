const Exercise = require('../models/Exercise');

// @desc    Get all exercises
// @route   GET /api/v1/exercises
// @access  Public
exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find();

    return res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add an exercise
// @route   POST /api/v1/exercises
// @access  Public
exports.addExercise = async (req, res, next) => {
  try {
    const { username, description, duration, date } = req.body;

    const exercise = await Exercise.create(req.body);

    return res.status(201).json({
      success: true,
      data: exercise,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Get an exercise
// @route   GET /api/v1/exercises/:id
// @access  Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'No exercise found',
      });
    }

    return res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Update an exercise
// @route   PUT /api/v1/exercises/:id
// @access  Public
exports.updateExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'No exercise found',
      });
    }

    const { username, description, duration, date } = req.body;
    exercise.username = username;
    exercise.description = description;
    exercise.duration = duration;
    exercise.date = date;

    await exercise.save();

    return res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete an exercise
// @route   DELETE /api/v1/exercises/:id
// @access  Public
exports.deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'No exercise found',
      });
    }

    await exercise.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

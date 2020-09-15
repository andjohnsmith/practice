const express = require('express');
const router = express.Router();
const {
  getExercises,
  addExercise,
  getExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exercises');

router.route('/exercises').get(getExercises).post(addExercise);

router
  .route('/exercises/:id')
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;

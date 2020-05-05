const express = require('express');

const exerciseCtrl = require('../controllers/exercise-ctrl');

const router = express.Router();

router.get('/exercises', exerciseCtrl.retrieveExercises);
router.get('/exercises/:id', exerciseCtrl.retrieveExerciseById);
router.post('/exercises', exerciseCtrl.createExercise);
router.put('/exercises/:id', exerciseCtrl.updateExercise);
router.delete('/exercises/:id', exerciseCtrl.deleteExercise);

module.exports = router;

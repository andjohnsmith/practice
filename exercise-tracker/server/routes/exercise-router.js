const express = require('express');

const exerciseCtrl = require('../controllers/exercise-ctrl');

const router = express.Router();

router.get('/exercises', exerciseCtrl.retrieveExercises);
router.post('/exercises', exerciseCtrl.createExercise);

module.exports = router;

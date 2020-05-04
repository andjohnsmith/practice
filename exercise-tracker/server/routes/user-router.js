const express = require('express');

const userCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.get('/users', userCtrl.retrieveUsers);
router.post('/users', userCtrl.createUser);

module.exports = router;

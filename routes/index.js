const express = require('express');
const userControl = require('../control/user');

const router = express();
router.post('/user', userControl.user);

module.exports = router;

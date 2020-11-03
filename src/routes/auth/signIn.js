const express = require('express')
const router = express.Router()

router.get('/candidate',SignUp);
router.get('/company', (req, res, next) => {
    res.send('Welcome to Interview Share Backend');
});
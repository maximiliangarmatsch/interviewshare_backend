const express = require('express');
const { PORT } = require('../settings/settings');

const router = express.Router();
router.get('/', (req, res, next) => res.status(200).json({ message: 'Welcome to Interview Share API', envVars: PORT }));
module.exports = router;

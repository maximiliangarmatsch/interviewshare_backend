import { connectionString, testEnvironmentVariable } from '../settings/settings';

const express = require('express');

const router = express.Router();
router.get('/', (req, res, next) => res.status(200).json({ message: 'Welcome to Interview Share', envVars: connectionString }));
module.exports = router;

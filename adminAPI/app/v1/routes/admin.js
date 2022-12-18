const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { register, login } = require('../models/admin');

const router = express.Router();
const routeName = '/auth';

router.post(`${routeName}/register`, authMiddleware, register);
router.post(`${routeName}/login`, login);

module.exports = router;

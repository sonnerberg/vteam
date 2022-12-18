const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const auth = require('../models/auth');

const router = express.Router();
const routeName = '/auth';

router.post(`${routeName}/register`, authMiddleware, auth.register);
router.post(`${routeName}/login`, auth.login);

module.exports = router;

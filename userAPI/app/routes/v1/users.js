const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../../models/users.js');
const route = '/user';

router.get(`${route}/`, getUserInfo);

module.exports = router;

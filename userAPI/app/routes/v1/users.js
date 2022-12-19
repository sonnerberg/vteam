const express = require('express');
const router = express.Router();
const { getUserInfo, updateUserInfo } = require('../../models/users.js');
const route = '/user';

router.get(`${route}/`, getUserInfo);
router.put(`${route}/update`, updateUserInfo);

module.exports = router;

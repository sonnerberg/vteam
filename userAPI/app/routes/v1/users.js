const express = require('express');
const router = express.Router();
const {
    getUserInfo,
    updateUserInfo,
    updateUserPassword,
    getUserTrips,
} = require('../../models/users.js');
const route = '/user';

router.post(`${route}/`, getUserInfo);
router.put(`${route}/update`, updateUserInfo);
router.put(`${route}/password`, updateUserPassword);
router.post(`${route}/trips`, getUserTrips);

module.exports = router;

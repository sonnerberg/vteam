const express = require('express');
const router = express.Router();
const {
    getUserInfo,
    updateUserInfo,
    updateUserPassword,
    updateUserBalance,
    getUserTrips,
    setUserCredit,
    setUserKlarna,
} = require('../../models/users.js');
const route = '/user';

router.post(`${route}/`, getUserInfo);
router.put(`${route}/update`, updateUserInfo);
router.put(`${route}/password`, updateUserPassword);
router.post(`${route}/balance`, updateUserBalance);
router.post(`${route}/trips`, getUserTrips);
router.post(`${route}/klarna`, setUserKlarna);
router.post(`${route}/credit`, setUserCredit);

module.exports = router;

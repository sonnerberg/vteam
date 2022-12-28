const express = require('express');
const router = express.Router();
const {
    getAvailableBikes,
    rentBike,
    returnBike,
} = require('../../models/bikes');
const route = '/bikes';

router.get(`${route}/`, getAvailableBikes);
router.post(`${route}/rent`, rentBike);
router.post(`${route}/return`, returnBike);

module.exports = router;

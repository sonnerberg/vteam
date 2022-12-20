const express = require('express');
const router = express.Router();
const { getParkingZones } = require('../../models/parking');
const route = '/parking';

router.get(`${route}/`, getParkingZones);

module.exports = router;

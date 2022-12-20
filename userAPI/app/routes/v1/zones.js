const express = require('express');
const router = express.Router();
const { getAllZones } = require('../../models/zones');
const route = '/zones';

router.get(`${route}/`, getAllZones);

module.exports = router;

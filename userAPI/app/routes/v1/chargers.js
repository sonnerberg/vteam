const express = require('express');
const router = express.Router();
const { getAllChargers } = require('../../models/chargers');
const route = '/chargers';

router.get(`${route}/`, getAllChargers);

module.exports = router;

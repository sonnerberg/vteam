const express = require('express');
const router = express.Router();
const { getAvailableBikes } = require('../../models/bikes');
const route = '/bikes';

router.get(`${route}/`, getAvailableBikes);

module.exports = router;

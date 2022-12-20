const express = require('express');
const router = express.Router();
const { getAllCities } = require('../../models/cities');
const route = '/cities';

router.get(`${route}/`, getAllCities);

module.exports = router;

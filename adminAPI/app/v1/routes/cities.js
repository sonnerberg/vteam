const express = require('express');
const cities = require('../models/cities');

const router = express.Router();
const routeName = '/cities';

router.get(`${routeName}/`, cities.getAllCities);
router.get(`${routeName}/:name`, cities.getCitiesByName);
router.post(`${routeName}/`, cities.insertCity);
router.put(`${routeName}/:name`, cities.updateCity);

module.exports = router;

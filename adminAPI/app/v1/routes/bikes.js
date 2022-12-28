const express = require('express');
const bikes = require('../models/bikes');

const router = express.Router();
const routeName = '/bikes';

router.get(`${routeName}/:id`, bikes.getBikesById);
router.get(`${routeName}`, bikes.getAllBikes);

// TODO: remove 'new' from route
router.post(`${routeName}/new`, bikes.insertANewBike);
router.post(`${routeName}/return`, bikes.returnBike);
router.post(`${routeName}/rent`, bikes.rentBike);
router.post(`${routeName}/within`, bikes.getBikesWithinPolygon);

router.put(`${routeName}/:id`, bikes.updateABike);

module.exports = router;

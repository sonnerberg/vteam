const express = require('express');
const parkings = require('../models/parking');

const router = express.Router();
const routeName = '/parking';

router.get(`${routeName}/`, parkings.getAllParkings);
router.get(`${routeName}/:id`, parkings.getParkingsByid);
router.post(`${routeName}/`, parkings.insertParking);
router.put(`${routeName}/:id`, parkings.updateParking);
router.delete(`${routeName}/:id`, parkings.deleteParkingByid);

module.exports = router;

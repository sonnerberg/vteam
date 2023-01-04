const express = require('express');
const chargings = require('../models/charging');

const router = express.Router();
const routeName = '/charging';

router.get(`${routeName}/`, chargings.getAllChargings);
router.get(`${routeName}/:id`, chargings.getChargingsByid);
router.post(`${routeName}/`, chargings.insertCharging);
router.put(`${routeName}/:id`, chargings.updateCharging);
router.delete(`${routeName}/:id`, chargings.deleteChargingByid);

module.exports = router;

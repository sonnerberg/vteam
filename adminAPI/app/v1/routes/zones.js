const express = require('express');
const zones = require('../models/zones');

const router = express.Router();
const routeName = '/zone';

router.get(`${routeName}/`, zones.getAllZones);
router.get(`${routeName}/:id`, zones.getZonesByid);
router.post(`${routeName}/`, zones.insertZone);
router.put(`${routeName}/:id`, zones.updateZone);
router.delete(`${routeName}/:id`, zones.deleteZoneByid);

module.exports = router;

const express = require('express');
const admin = require('../models/admin');

const router = express.Router();
const routeName = '/admin';

router.get(`${routeName}/`, admin.getAllAdmins);

module.exports = router;

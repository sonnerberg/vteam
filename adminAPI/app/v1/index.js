const express = require('express');
const adminRouter = require('./routes/admin');
const bikesRouter = require('./routes/bikes');
const tripsRouter = require('./routes/trips');

const router = express.Router();

router.use('/', adminRouter, bikesRouter, tripsRouter);

module.exports = router;

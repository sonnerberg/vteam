const express = require('express');
const authRouter = require('./routes/auth');
const bikesRouter = require('./routes/bikes');
const tripsRouter = require('./routes/trips');
const adminRouter = require('./routes/admin');
const customerRouter = require('./routes/customer');
const citiesRouter = require('./routes/cities');
const zonesRouter = require('./routes/zones');
const parkingsRouter = require('./routes/parking');
const { authMiddleware } = require('./middleware/authMiddleware');

const router = express.Router();

router.use(
    '/',
    authRouter,
    authMiddleware,
    bikesRouter,
    tripsRouter,
    adminRouter,
    customerRouter,
    citiesRouter,
    parkingsRouter,
    zonesRouter
);

module.exports = router;

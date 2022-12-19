const express = require('express');
const authRouter = require('./routes/auth');
const bikesRouter = require('./routes/bikes');
const tripsRouter = require('./routes/trips');
const adminRouter = require('./routes/admin');
const customerRouter = require('./routes/customer');

const router = express.Router();

router.use(
    '/',
    authRouter,
    bikesRouter,
    tripsRouter,
    adminRouter,
    customerRouter
);

module.exports = router;

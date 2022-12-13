const express = require('express');
const initialTestRoutes = require('./routes/initialTestRoutes');
const adminRouter = require('./routes/admin');
const bikesRouter = require('./routes/bikes');
const bikesJsonRouter = require('./routes/bikesJson');

const router = express.Router();

router.use('/', initialTestRoutes, adminRouter, bikesRouter, bikesJsonRouter);

module.exports = router;

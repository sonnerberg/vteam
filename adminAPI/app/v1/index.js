const express = require('express');
const initialTestRoutes = require('./routes/initialTestRoutes');
const adminRouter = require('./routes/admin');

const router = express.Router();

router.use('/', initialTestRoutes, adminRouter);

module.exports = router;

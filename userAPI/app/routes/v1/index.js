const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
const { validateToken } = require('../../models/jwtToken');
const table = require('../../config/tables.json');
const customerRouter = require('./users');
const bikesRouter = require('./bikes');
const cityRouter = require('./cities');
const parkingRouter = require('./parking');
const zoneRouter = require('./zones');
const chargerRouter = require('./chargers');
const router = express.Router();

router.use(validateToken);

router.use(customerRouter);
router.use(bikesRouter);
router.use(cityRouter);
router.use(parkingRouter);
router.use(zoneRouter);
router.use(chargerRouter);

router.get('/', (_, res) => res.send('welcome to v1 @ user-api'));

router.get('/mariadb', async (req, res) => {
    const sql = `SELECT * FROM ${table.user}`;
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

module.exports = router;

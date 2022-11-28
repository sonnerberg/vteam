const express = require('express');
const { queryDatabase } = require('../database/mariadb');
const router = express.Router();

router.get('/', (_, res) => res.send('welcome to v1'));

router.get('/mariadb', async (req, res) => {
    const sql = 'SELECT * FROM customer';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

router.get('/scooter', async (req, res) => {
    const sql = 'SELECT * FROM scooter';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

router.get('/zones', async (req, res) => {
    const sql = 'SELECT * FROM zones';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

module.exports = router;

const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
// const { validateToken } = require('../../models/jwtToken');
const table = require('../../config/tables.json');
const router = express.Router();

// router.use(validateToken);

router.get('/', (_, res) => res.send('welcome to v1 @ user-api'));

router.get('/mariadb', async (req, res) => {
    const sql = `SELECT * FROM ${table.user}`;
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

router.get('/geojson', async (req, res) => {
    const sql = 'SELECT * FROM geojson';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

router.get('/geojson/geometry', async (req, res) => {
    const sql = 'SELECT ST_GeomFromGeoJson(position) FROM geojson';
    // const sql = 'SELECT position FROM geojson';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

module.exports = router;

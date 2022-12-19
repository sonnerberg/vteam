const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
// const { validateToken } = require('../../models/jwtToken');
const table = require('../../config/tables.json');
const customerRouter = require('./users');
const bikesRouter = require('./bikes');
const router = express.Router();

// router.use(validateToken);

router.use(customerRouter);
router.use(bikesRouter);

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

router.get('/bikes', async (req, res) => {
    const sql = 'SELECT * FROM bikes';
    const data = await queryDatabase(sql);
    // res.status(200).json(data);
    res.status(200).json(sqlToGeoJson(data));
});

router.put('/bikes/position', async (req, res) => {
    // TODO placeholder and stored procedure bugs out. why?
    const bikeId = req.body.id;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const sql = `UPDATE bikes
         SET geometry = ST_PointFromText("POINT(${latitude} ${longitude})")
         WHERE id=${bikeId}`;
    const data = await updateBikePosition(sql);
    res.json(data);
});

const sqlToGeoJson = (sql) => {
    const geoJson = sql.map((x) => {
        return {
            position: {
                type: 'Feature',
                geometry: x.geometry,
                properties: {
                    id: x.id,
                    charging: x.charging,
                    blocked: x.blocked,
                    batteryWarning: x.battery_warning,
                    batteryDepleted: x.battery_depleted,
                    rented: x.rented,
                    userId: x.user_id,
                    featureType: 'bikes',
                },
            },
        };
    });
    return geoJson;
};

const updateBikePosition = async (sql) => {
    const data = await queryDatabase(sql);
    if (data.error) {
        return data;
    }
    return {
        data: {
            status: 200,
            message: 'bike position updated',
        },
    };
};

module.exports = router;

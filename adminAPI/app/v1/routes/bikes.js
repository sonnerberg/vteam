const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
// const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
// const routeName = '/bikes';

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
    return {
        data: geoJson,
    };
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

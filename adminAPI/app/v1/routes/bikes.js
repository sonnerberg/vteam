const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
// const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
// const routeName = '/bikes';

router.get('/bikes', async (req, res) => {
    const sql = 'SELECT * FROM bikes';
    const data = await queryDatabase(sql);
    res.status(200).json(sqlToGeoJson(data));
});

router.put('/bikes/position', async (req, res) => {
    const bikeId = req.body.id;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const sql = 'CALL update_scooter_position(?, ?, ?)';
    const placeholder = [bikeId, latitude, longitude];
    const data = await updateBikePosition(sql, placeholder);
    res.json(data);
});

router.post('/bikes/new', async (req, res) => {
    const sql = 'CALL new_scooter(?, ?)';
    const placeholder = [req.body.latitude, req.body.longitude];
    const data = await insertNewBike(sql, placeholder);
    // console.log(data);
    res.status(200).json(data);
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

const updateBikePosition = async (sql, placeholder) => {
    const data = await queryDatabase(sql, placeholder);
    if (data.text) {
        return {
            error: {
                status: 500,
                message: data.text,
            },
        };
    }
    return {
        data: {
            status: 200,
            message: 'bike position updated',
        },
    };
};

const insertNewBike = async (sql, placeholder) => {
    const data = await queryDatabase(sql, placeholder);
    if (data.text) {
        return {
            error: {
                status: 500,
                message: data.text,
            },
        };
    }

    return {
        data: {
            status: 200,
            message: 'bike added',
            id: Number(data[0][0].id),
            token: 'asdf',
        },
    };
};

module.exports = router;

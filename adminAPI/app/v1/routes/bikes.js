const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
// const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
// const routeName = '/bikes';

const allowedFields = {
    coordinates: 'geometry',
    charging: 'charging',
    blocked: 'blocked',
    whole: 'whole',
    battery_warning: 'battery_warning',
    battery_depleted: 'battery_depleted',
    rented: 'rented',
    user_id: 'user_id',
};

router.get('/bikes', async (_, res) => {
    const sql = 'CALL get_all_scooters()';
    const { 0: data } = await queryDatabase(sql);
    res.status(200).json(sqlToGeoJson(data));
});

router.put('/bikes/:id', async (req, res) => {
    try {
        let updateFields = [];
        let params = [];
        let sql = 'UPDATE bikes SET ';

        const { body } = req;
        for (const field in allowedFields) {
            console.log(field, body[field]);
            if (field === 'coordinates') {
                updateFields.push(
                    allowedFields[field] +
                        ' = ST_PointFromText(CONCAT(\'POINT(\', ?, \' \', ?, \')\'))'
                );
                params.push(body[field][0], body[field][1]);
            } else {
                updateFields.push(allowedFields[field] + ' = ?');
                params.push(body[field]);
            }
        }
        sql += updateFields.join(', ');

        sql += ' WHERE id = ?';

        params.push(req.params.id);
        sql += ';';
        const { affectedRows } = await queryDatabase(sql, params);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});
router.put('/bikes/charging/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { charging } = req.body;
        const sql = 'CALL update_scooter_charging(?,?);';
        const { affectedRows } = await queryDatabase(sql, [charging, id]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});

router.put('/bikes/blocked/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { blocked } = req.body;
        const sql = 'CALL update_scooter_blocked(?,?);';
        const { affectedRows } = await queryDatabase(sql, [blocked, id]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});

router.put('/bikes/battery_warning/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { battery_warning } = req.body;
        const sql = 'CALL update_scooter_battery_warning(?,?);';
        const { affectedRows } = await queryDatabase(sql, [
            battery_warning,
            id,
        ]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});

router.put('/bikes/battery_depleted/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { battery_depleted } = req.body;
        const sql = 'CALL update_scooter_battery_depleted(?,?);';
        const { affectedRows } = await queryDatabase(sql, [
            battery_depleted,
            id,
        ]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});

router.put('/bikes/rented/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rented } = req.body;
        const sql = 'CALL update_scooter_rented(?,?);';
        const { affectedRows } = await queryDatabase(sql, [rented, id]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});

router.put('/bikes/user_id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        const sql = 'CALL update_scooter_user_id(?,?);';
        const { affectedRows } = await queryDatabase(sql, [user_id, id]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
});

router.put('/bikes/whole/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { whole } = req.body;
        const sql = 'CALL update_scooter_whole(?,?);';
        const { affectedRows } = await queryDatabase(sql, [whole, id]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(400);
    }
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
                    whole: x.whole,
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

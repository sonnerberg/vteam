const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
const { scooterSchema } = require('../utils');
// const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const routeName = '/bikesjson';

router.post(
    `${routeName}/within`,
    // authMiddleware,
    getAllBikesWithin
);
router.get(
    `${routeName}/`,
    // authMiddleware,
    getAllBikes
);
router.get(
    `${routeName}/clean`,
    // authMiddleware,
    getAllBikesClean
);
router.get(
    `${routeName}/:id`,
    // authMiddleware,
    getABike
);
router.post(
    `${routeName}/`,
    // authMiddleware,
    addABike
);
router.put(
    `${routeName}/:id`,
    // authMiddleware,
    updateABike
);
router.delete(
    `${routeName}/:id`,
    // authMiddleware,
    deleteABike
);

async function updateABike(req, res) {
    try {
        const { params: { id }, } = req;
        const validationResult = scooterSchema.validate(req.body);
        if (validationResult.error) throw 'InvalidUserInput';
        const sql = 'CALL update_bike(?,?);';
        const { affectedRows } = await queryDatabase(sql, [id, req.body]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            throw 'CannotUpdate';
        }
    } catch {
        res.sendStatus(400);
    }
}
async function addABike(req, res) {
    // TODO: Store default scooter in db?
    const defaultScooter = {
        position: {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [10.1, 10.1],
            },
        },
        properties: {
            whole: false,
            charging: false,
            blocked: true,
            batterywarning: false,
            batterydepleted: false,
            rented: false,
            userid: 1,
            featureType: 'bikes',
        },
    };
    try {
        const validationResult = scooterSchema.validate(req.body);
        if (validationResult.error) throw 'InvalidUserInput';
        const sql = 'CALL add_bike(?,?);';
        const { affectedRows } = await queryDatabase(sql, [
            defaultScooter,
            req.body,
        ]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            throw 'CannotInsert';
        }
    } catch {
        res.sendStatus(400);
    }
}
async function deleteABike(req, res) {
    try {
        // eslint-disable-next-line object-curly-newline
        const {
            params: { id },
            // eslint-disable-next-line object-curly-newline
        } = req;
        const sql = 'CALL delete_bike(?)';
        const { affectedRows } = await queryDatabase(sql, [id]);

        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(204);
        }
    } catch {
        res.sendStatus(500);
    }
}
async function getABike(req, res) {
    try {
        // eslint-disable-next-line object-curly-newline
        const {
            params: { id },
            // eslint-disable-next-line object-curly-newline
        } = req;
        const sql = 'CALL get_bike_by_id(?)';
        const {
            // eslint-disable-next-line object-curly-newline
            0: {
                0: { bike: data },
                // eslint-disable-next-line object-curly-newline
            },
        } = await queryDatabase(sql, [id]);

        // console.log(data[0].bike);

        res.json({
            data,
        });
    } catch {
        res.sendStatus(404);
    }
}

async function getAllBikesWithin(req, res) {
    // TODO: Validate req.body
    console.log(req.body);
    try {
        const sql = 'CALL get_bikes_within_bounding_box(?)';
        const data = await queryDatabase(sql, [
            JSON.parse(JSON.stringify(req.body)),
        ]);

        console.log('data', data);

        // res.json({
        //     data,
        // });

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}
async function getAllBikes(req, res) {
    try {
        const sql = 'CALL get_bikes()';
        const { 0: data } = await queryDatabase(sql);

        res.json({
            data,
        });
    } catch (error) {
        res.sendStatus(500);
    }
}

async function getAllBikesClean(req, res) {
    try {
        const sql = 'CALL get_bikes()';
        const { 0: dirtyData } = await queryDatabase(sql);

        const data = dirtyData.map((bike) => bike.bike);

        res.json({
            data,
        });
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = router;

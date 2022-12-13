const express = require('express');
const { queryDatabase } = require('../../database/mariadb');
// const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const routeName = '/bikesjson';

router.get(
    `${routeName}/`,
    // authMiddleware,
    getAllBikes
);

async function getAllBikes(req, res) {
    try {
        const sql = 'CALL get_bikes()';
        const { 0: data } = await queryDatabase(sql);

        res.status(200).json({
            data,
        });
    } catch (error) {
        switch (error) {
        case 'InvalidEmailOrPassword':
            res.sendStatus(400);
            break;
        case 'DuplicateEntry':
            res.sendStatus(409);
            break;
        case 'NotSuperUser':
            res.sendStatus(401);
            break;

        default:
            res.sendStatus(500);
            break;
        }
    }
}

module.exports = router;

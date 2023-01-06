const { queryDatabase } = require('../../database/mariadb');
const {
    checkIfScooterFromFreeParkingToParking,
    sqlToGeoJson,
    checkIfScooterIsInForbiddenZone,
} = require('../utils/');

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
        },
    };
};

const insertANewBike = async (req, res) => {
    const sql = 'CALL new_scooter(?, ?)';
    const placeholder = [req.body.latitude, req.body.longitude];
    const data = await insertNewBike(sql, placeholder);
    res.status(200).json(data);
};

const updateABike = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const { 0: { 0: { rented }, }, } = await queryDatabase('CALL check_if_scooter_is_rented(?)', [id]);
        let inForbiddenZone;
        const allowedFields = {
            coordinates: 'geometry',
            charging: 'charging',
            blocked: 'blocked',
            whole: 'whole',
            battery_warning: 'battery_warning',
            battery_depleted: 'battery_depleted',
        };

        if (rented) {
            inForbiddenZone = await checkIfScooterIsInForbiddenZone(
                JSON.stringify(body.coordinates)
                    .replace(',', ' ')
                    .replace(']', '')
                    .replace('[', '')
            );
            if (inForbiddenZone) {
                const sql = 'CALL set_scooter_returned_by_id(?);';
                await queryDatabase(sql, [id]);
                throw 'ScooterInForbiddenZone';
            }
        }

        let updateFields = [];
        let params = [];
        let sql = 'UPDATE bikes SET ';

        for (const field in allowedFields) {
            if (body[field] !== undefined) {
                if (field === 'coordinates') {
                    if (rented) {
                        updateFields.push(
                            allowedFields[field] +
                                ' = ST_PointFromText(CONCAT(\'POINT(\', ?, \' \', ?, \')\'))'
                        );
                        params.push(body[field][0], body[field][1]);
                    }
                } else {
                    updateFields.push(allowedFields[field] + ' = ?');
                    params.push(body[field]);
                }
            }
        }
        sql += updateFields.join(', ');

        sql += ' WHERE id = ?';

        params.push(id);
        sql += ';';
        const { affectedRows } = await queryDatabase(sql, params);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        switch (error) {
        case 'ScooterInForbiddenZone':
            res.status(409).json({
                error: `Scooter with id ${id} returned because it is inside a forbidden zone.`,
            });
            break;

        default:
            res.sendStatus(404);
            break;
        }
    }
};
const getAllBikes = async (_, res) => {
    const sql = 'CALL get_all_scooters()';
    const { 0: data } = await queryDatabase(sql);
    res.status(200).json(sqlToGeoJson(data));
};

const getBikesWithinPolygon = async (req, res) => {
    const sql = 'CALL get_scooters_within(?);';
    const { 0: data } = await queryDatabase(sql, [JSON.stringify(req.body)]);
    res.json(sqlToGeoJson(data));
};

const rentBike = async (req, res) => {
    try {
        const { username, id } = req.body;
        const sql = 'CALL set_scooter_rented(?,?);';
        const { affectedRows } = await queryDatabase(sql, [username, id]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            throw 'CannotRent';
        }
    } catch {
        res.sendStatus(400);
    }
};
const returnBike = async (req, res) => {
    const { username } = req.body;
    const sql = 'CALL set_scooter_returned(?);';
    const { affectedRows } = await queryDatabase(sql, [username]);
    if (affectedRows) {
        const sql2 = 'CALL get_startposition_and_endposition_of_last_trip(?)';
        const {
            0: {
                0: {
                    startposition: { coordinates: startposition },
                    endposition: { coordinates: endposition },
                },
            },
        } = await queryDatabase(sql2, [username]);
        const giveDiscount = await checkIfScooterFromFreeParkingToParking(
            startposition.toString().replace(',', ' '),
            endposition.toString().replace(',', ' ')
        );
        if (giveDiscount) {
            const sql3 = 'CALL give_discount(?)';
            await queryDatabase(sql3, [username]);
        }
        const sql4 = 'CALL charge_customer(?);';
        await queryDatabase(sql4, [username]);
        res.sendStatus(200);
    } else {
        res.sendStatus(204);
    }
};
const getBikesById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'CALL get_scooter_by_id(?)';
        const { 0: { 0: data }, } = await queryDatabase(sql, [id]);
        res.json(sqlToGeoJson([data]));
    } catch {
        res.sendStatus(400);
    }
};

const insertMultipleBikes = async (req, res) => {
    try {
        const { numberOfBikes } = req.body;
        const sql = 'CALL insert_multiple_bikes(?)';
        const { 0: data } = await queryDatabase(sql, [numberOfBikes]);
        res.json(data);
    } catch {
        res.sendStatus(400);
    }
};

module.exports = {
    getBikesById,
    returnBike,
    rentBike,
    getBikesWithinPolygon,
    getAllBikes,
    updateABike,
    insertANewBike,
    insertMultipleBikes,
};

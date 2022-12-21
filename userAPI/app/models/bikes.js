const { queryDatabase } = require('../database/mariadb');

exports.getAvailableBikes = async (req, res) => {
    const sql = 'SELECT * FROM bikes WHERE rented=0';
    const data = await queryDatabase(sql);
    res.json({
        bikes: data,
    });
};

exports.rentBike = async (req, res) => {
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

exports.returnBike = async (req, res) => {
    try {
        const { username } = req.body;
        const sql = 'CALL set_scooter_returned(?);';
        const { affectedRows } = await queryDatabase(sql, [username]);
        if (affectedRows) {
            res.sendStatus(200);
        } else {
            res.sendStatus(204);
        }
    } catch {
        res.sendStatus(400);
    }
};

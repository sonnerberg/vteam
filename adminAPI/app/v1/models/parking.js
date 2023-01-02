const { queryDatabase } = require('../../database/mariadb');
const { sqlToGeoJson } = require('../utils');

async function updateParking(req, res) {
    let parsedCoordinates = '';
    const { id } = req.params;
    const { coordinates } = req.body;
    coordinates[0].forEach((coordinate) => {
        parsedCoordinates += coordinate.toString().replace(',', ' ');
        parsedCoordinates += ',';
    });
    parsedCoordinates = parsedCoordinates.slice(0, -1);
    const sql = 'CALL update_parking(?,?);';
    const { affectedRows } = await queryDatabase(sql, [id, parsedCoordinates]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function insertParking(req, res) {
    let parsedCoordinates = '';
    const { coordinates } = req.body;
    coordinates[0].forEach((coordinate) => {
        parsedCoordinates += coordinate.toString().replace(',', ' ');
        parsedCoordinates += ',';
    });
    parsedCoordinates = parsedCoordinates.slice(0, -1);
    const sql = 'CALL insert_parking(?);';
    const { affectedRows } = await queryDatabase(sql, [parsedCoordinates]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function getAllParkings(_, res) {
    const sql = 'CALL get_all_parkings();';
    const { 0: data } = await queryDatabase(sql);
    res.json(sqlToGeoJson(data));
}
async function getParkingsByid(req, res) {
    const { id } = req.params;
    const sql = 'CALL get_all_parkings_by_id(?);';
    const { 0: data } = await queryDatabase(sql, [id]);
    res.json(sqlToGeoJson(data));
}

async function deleteParkingByid(req, res) {
    const { id } = req.params;
    const sql = 'CALL delete_parking_by_id(?);';
    const { affectedRows } = await queryDatabase(sql, [id]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(204);
    }
}

module.exports = {
    getAllParkings,
    getParkingsByid,
    insertParking,
    updateParking,
    deleteParkingByid,
};

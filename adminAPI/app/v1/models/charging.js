const { queryDatabase } = require('../../database/mariadb');
const { sqlToGeoJson } = require('../utils');
const { parseCoordinates } = require('../utils/');

async function updateCharging(req, res) {
    const { id } = req.params;
    const { coordinates } = req.body;
    const parsedCoordinates = parseCoordinates(coordinates);
    const sql = 'CALL update_charging(?,?);';
    const { affectedRows } = await queryDatabase(sql, [id, parsedCoordinates]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function insertCharging(req, res) {
    const { coordinates } = req.body;
    const parsedCoordinates = parseCoordinates(coordinates);
    const sql = 'CALL insert_charging(?);';
    const { affectedRows } = await queryDatabase(sql, [parsedCoordinates]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function getAllChargings(_, res) {
    const sql = 'CALL get_all_chargings();';
    const { 0: data } = await queryDatabase(sql);
    res.json(sqlToGeoJson(data));
}
async function getChargingsByid(req, res) {
    const { id } = req.params;
    const sql = 'CALL get_all_chargings_by_id(?);';
    const { 0: data } = await queryDatabase(sql, [id]);
    res.json(sqlToGeoJson(data));
}

async function deleteChargingByid(req, res) {
    const { id } = req.params;
    const sql = 'CALL delete_charging_by_id(?);';
    const { affectedRows } = await queryDatabase(sql, [id]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(204);
    }
}

module.exports = {
    getAllChargings,
    getChargingsByid,
    insertCharging,
    updateCharging,
    deleteChargingByid,
};

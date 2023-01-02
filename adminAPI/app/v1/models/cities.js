const { queryDatabase } = require('../../database/mariadb');
const { sqlToGeoJson, parseCoordinates } = require('../utils');

async function updateCity(req, res) {
    const { name } = req.params;
    const { coordinates } = req.body;
    const parsedCoordinates = parseCoordinates(coordinates);
    const sql = 'CALL update_city(?,?);';
    const { affectedRows } = await queryDatabase(sql, [
        name,
        parsedCoordinates,
    ]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function insertCity(req, res) {
    const { coordinates, name } = req.body;
    const parsedCoordinates = parseCoordinates(coordinates);
    const sql = 'CALL insert_city(?,?);';
    const { affectedRows } = await queryDatabase(sql, [
        name,
        parsedCoordinates,
    ]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function getAllCities(_, res) {
    const sql = 'CALL get_all_cities();';
    const { 0: data } = await queryDatabase(sql);
    res.json(sqlToGeoJson(data));
}
async function getCitiesByName(req, res) {
    const { name } = req.params;
    const sql = 'CALL get_all_cities_by_name(?);';
    const { 0: data } = await queryDatabase(sql, [name]);
    res.json(sqlToGeoJson(data));
}

async function deleteCityByName(req, res) {
    const { name } = req.params;
    const sql = 'CALL delete_city_by_name(?);';
    const { affectedRows } = await queryDatabase(sql, [name]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(204);
    }
}

module.exports = {
    getAllCities,
    getCitiesByName,
    insertCity,
    updateCity,
    deleteCityByName,
};

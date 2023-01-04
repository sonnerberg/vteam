const { queryDatabase } = require('../../database/mariadb');
const { parseCoordinates } = require('./parseCoordinates');

const checkIfScooterIsInForbiddenZone = async (position) => {
    let parsedCoordinates = [];
    const sql = 'CALL get_all_forbidden_zones();';
    const response = await queryDatabase(sql);
    response[0].forEach((zone) => {
        parsedCoordinates.push(
            `(${parseCoordinates(zone.geometry.coordinates)})`
        );
    });
    const sql2 = 'CALL scooter_in_forbidden_zone(?,?);';
    const { 0: { 0: { scooter_in_forbidden_zone: bikeInForbiddenZone }, }, } = await queryDatabase(sql2, [`${parsedCoordinates}`, position]);
    if (bikeInForbiddenZone) {
        return true;
    }
    return false;
};

module.exports = {
    checkIfScooterIsInForbiddenZone,
};

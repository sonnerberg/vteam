const { queryDatabase } = require('../../database/mariadb');
const { parseCoordinates } = require('./parseCoordinates');

const checkIfScooterFromFreeParkingToParking = async (
    startposition,
    endposition
) => {
    let parsedCoordinates = [];
    const sql = 'CALL get_geometry_for_parkings();';

    const response = await queryDatabase(sql);
    response[0].forEach((zone) => {
        parsedCoordinates.push(
            `(${parseCoordinates(zone.geometry.coordinates)})`
        );
    });
    const sql2 = 'CALL check_if_free_parking_to_parking(?,?,?);';

    const { 0: { 0: { give_discount }, }, } = await queryDatabase(sql2, [
        `${parsedCoordinates}`,
        startposition,
        endposition,
    ]);
    if (give_discount) {
        return true;
    }
    return false;
};

module.exports = {
    checkIfScooterFromFreeParkingToParking,
};

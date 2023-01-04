function parseCoordinates(coordinates) {
    let parsedCoordinates = '';

    coordinates[0].forEach((coordinate) => {
        parsedCoordinates += coordinate.toString().replace(',', ' ');
        parsedCoordinates += ',';
    });
    parsedCoordinates = parsedCoordinates.slice(0, -1);
    return parsedCoordinates;
}

module.exports = {
    parseCoordinates,
};

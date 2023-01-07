const { queryDatabase } = require('../database/mariadb');

exports.getAvailableBikes = async (req, res) => {
    const sql = 'SELECT * FROM bikes WHERE rented=0';
    const data = await queryDatabase(sql);
    // res.json({
    //     bikes: data,
    // });

    res.status(200).json(sqlToGeoJson(data));
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
            const sql2 =
                'CALL get_startposition_and_endposition_of_last_trip(?)';
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
    } catch {
        res.sendStatus(400);
    }
};

const sqlToGeoJson = (sql) => {
    const geoJson = sql.map((x) => {
        return {
            position: {
                type: 'Feature',
                geometry: x.geometry,
                properties: {
                    id: x.id,
                    charging: x.charging,
                    blocked: x.blocked,
                    batteryWarning: x.battery_warning,
                    batteryDepleted: x.battery_depleted,
                    whole: x.whole,
                    rented: x.rented,
                    userId: x.user_id,
                    username: x.username,
                    featureType: 'bikes',
                },
            },
        };
    });
    return {
        data: geoJson,
    };
};

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

function parseCoordinates(coordinates) {
    let parsedCoordinates = '';

    coordinates[0].forEach((coordinate) => {
        parsedCoordinates += coordinate.toString().replace(',', ' ');
        parsedCoordinates += ',';
    });
    parsedCoordinates = parsedCoordinates.slice(0, -1);
    return parsedCoordinates;
}

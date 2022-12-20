const { queryDatabase } = require('../database/mariadb');

exports.getParkingZones = async (req, res) => {
    try {
        const sql = 'SELECT * FROM parking';
        const data = await queryDatabase(sql);
        res.json(sqlToGeoJson(data));
    } catch {
        res.sendStatus(400);
    }
};

const sqlToGeoJson = (sql) => {
    const geoJson = sql.map((x) => {
        return {
            id: x.id,
            position: {
                type: x.type,
                geometry: x.geometry,
                properties: {
                    id: x.id,
                    featureType: x.feature_type,
                },
            },
        };
    });
    return {
        parking: geoJson,
    };
};

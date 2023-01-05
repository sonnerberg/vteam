const { queryDatabase } = require('../database/mariadb');

exports.getAllZones = async (req, res) => {
    try {
        const sql = 'SELECT * FROM zones';
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
                type: 'Feature',
                geometry: x.geometry,
                properties: {
                    id: x.id,
                    type: x.type,
                    speedLimit: x.speed_limit,
                    featureType: x.feature_type,
                },
            },
        };
    });
    return {
        zones: geoJson,
    };
};

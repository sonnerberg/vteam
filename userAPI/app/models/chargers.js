const { queryDatabase } = require('../database/mariadb');

exports.getAllChargers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM charging';
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
        chargingStations: geoJson,
    };
};

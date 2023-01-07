const sqlToGeoJson = (sql) => {
    const geoJson = sql.map((x) => {
        return {
            id: x.id,
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
                    name: x.name,
                    featureType: x.feature_type,
                    type: x.type,
                    speedLimit: x.speed_limit,
                    speed: x.speed,
                },
            },
        };
    });
    return {
        data: geoJson,
    };
};
module.exports = {
    sqlToGeoJson,
};

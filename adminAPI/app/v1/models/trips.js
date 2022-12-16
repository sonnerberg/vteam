const { queryDatabase } = require('../../database/mariadb');

async function getAllTrips(_, res) {
    const sql = 'CALL get_all_trips();';
    const { 0: data } = await queryDatabase(sql);
    res.json({
        data,
    });
}
async function getTripsByUsername(req, res) {
    const { username } = req.params;
    const sql = 'CALL get_all_trips_by_username(?);';
    const { 0: data } = await queryDatabase(sql, [username]);
    res.json({
        data,
    });
}
module.exports = {
    getAllTrips,
    getTripsByUsername,
};

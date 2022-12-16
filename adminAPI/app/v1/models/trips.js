const { queryDatabase } = require('../../database/mariadb');

async function getAllTrips(_, res) {
    const sql = 'CALL get_all_trips();';
    const { 0: data } = await queryDatabase(sql);
    res.json({
        data,
    });
}
async function getTripsByUserId(req, res) {
    const { userId } = req.params;
    const sql = 'CALL get_all_trips_by_user_id(?);';
    const { 0: data } = await queryDatabase(sql, [userId]);
    res.json({
        data,
    });
}
module.exports = {
    getAllTrips,
    getTripsByUserId,
};

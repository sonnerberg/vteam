const { queryDatabase } = require('../database/mariadb');

exports.getAvailableBikes = async (req, res) => {
    const sql = 'SELECT * FROM bikes WHERE rented=0';
    const data = await queryDatabase(sql);
    res.json({
        bikes: data
    });
};

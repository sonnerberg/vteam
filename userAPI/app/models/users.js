const table = require('../config/tables.json');
const { queryDatabase } = require('../database/mariadb');

exports.getUserInfo = async (req, res) => {
    const user = req.body.username;
    const sql = `SELECT * from ${table.user}
        WHERE username = ?`;
    const data = await queryDatabase(sql, [user]);
    res.json(data);
};

// exports.updateUserInfo = async (req, res) => {
//     // TODO
// };

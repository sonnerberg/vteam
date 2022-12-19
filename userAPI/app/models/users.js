// const table = require('../config/tables.json');
const { queryDatabase } = require('../database/mariadb');

exports.getUserInfo = async (req, res) => {
    const user = req.body.username;
    const sql = 'CALL get_customer_by_username(?)';

    const data = await queryDatabase(sql, [user]);
    // console.log(data[0]);
    res.json(data[0]);
};

// exports.updateUserInfo = async (req, res) => {
//     // TODO
// };

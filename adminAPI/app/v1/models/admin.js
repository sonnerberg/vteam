const { queryDatabase } = require('../../database/mariadb');

const admin = {
    getAllAdmins: async function (req, res) {
        const sql = 'CALL get_all_admins_except_super();';
        const { 0: data } = await queryDatabase(sql);
        res.json({
            data,
        });
    },
};

module.exports = admin;

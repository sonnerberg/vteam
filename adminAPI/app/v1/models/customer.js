const { queryDatabase } = require('../../database/mariadb');

const customer = {
    getAllCustomers: async function (req, res) {
        const sql = 'CALL get_all_customers();';
        const { 0: data } = await queryDatabase(sql);
        res.json({
            data,
        });
    },
    getCustomerByUsername: async function (req, res) {
        const { username } = req.params;
        const sql = 'CALL get_customer_by_username(?);';
        const { 0: data } = await queryDatabase(sql, [username]);
        res.json({
            data,
        });
    },
};

module.exports = customer;

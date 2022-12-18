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

    updateACustomer: async (req, res) => {
        const allowedFields = {
            surname: 'surname',
            lastname: 'lastname',
            adress: 'adress',
            billing_adress: 'billing_adress',
            email: 'email',
            balance: 'balance',
            status: 'status',
        };

        try {
            let updateFields = [];
            let params = [];
            let sql = 'UPDATE customer SET ';

            const { body } = req;
            for (const field in allowedFields) {
                if (body[field] !== undefined) {
                    updateFields.push(allowedFields[field] + ' = ?');
                    params.push(body[field]);
                }
            }
            sql += updateFields.join(', ');

            sql += ' WHERE username = ?';

            params.push(req.params.username);
            sql += ';';
            const { affectedRows } = await queryDatabase(sql, params);
            if (affectedRows) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch {
            res.sendStatus(400);
        }
    },
};

module.exports = customer;

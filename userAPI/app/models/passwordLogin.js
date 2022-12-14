const bcrypt = require('bcryptjs');
const { createNewToken } = require('./jwtToken');
const { queryDatabase } = require('../database/mariadb');
const table = require('../config/tables.json');

const saltRounds = 10;

exports.login = async (userName, password) => {
    if (!userName || !password) {
        return {
            error: {
                status: 401,
                message: 'Password or username cant be empty',
            },
        };
    }
    const sql = `SELECT id, password
    FROM ${table.user}
    WHERE username = ?`;
    const placeholder = [userName];

    const result = await queryDatabase(sql, placeholder);
    if (result.error) {
        return result;
    }

    if (!result[0]) {
        return {
            error: {
                status: 401,
                message: 'User not found',
            },
        };
    }
    const payload = {
        userId: result[0].id,
        userName: userName,
    };

    if (!bcrypt.compareSync(password, result[0].password)) {
        return {
            error: {
                status: 500,
                message: 'wrong password',
            },
        };
    }
    console.log(payload);
    return createNewToken(payload);
};

exports.registerUser = async (userInfo) => {
    const required = [
        'surName',
        'lastName',
        'adress',
        'billingAdress',
        'userName',
        'password',
        'email',
    ];
    if (!required.every((x) => x in userInfo)) {
        return {
            error: {
                status: 500,
                message: 'missing fields',
            },
        };
    }

    const hashedPassword = await bcrypt.hashSync(userInfo.password, saltRounds);
    const sql = `
        INSERT INTO ${table.user} (surname, lastname, adress, billing_adress, username, password, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const placeholder = [
        userInfo.surName,
        userInfo.lastName,
        userInfo.adress,
        userInfo.billingAdress,
        userInfo.userName,
        hashedPassword,
        userInfo.email,
    ];
    const result = await queryDatabase(sql, placeholder);
    if (result.error) {
        return result;
    }
    return {
        data: {
            status: 201,
            message: 'user added',
        },
    };
    // TODO auto login?
};

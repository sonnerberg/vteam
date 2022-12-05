// const bcrypt = require('bcryptjs');
const { createNewToken } = require('./jwtToken');
const { queryDatabase } = require('../database/mariadb');
const table = require('../config/tables.json');

// const saltRounds = 10;

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
        userId: result.id,
        userName: userName,
    };

    // TODO check with hashed password
    return createNewToken(payload);
};

// TODO add all remaining fields for a valid user
exports.registerUser = async (userName, password) => {
    if (!userName || !password) {
        return {
            error: {
                status: 401,
                message: 'Password or username cant be empty',
            },
        };
    }
    //.TODO hash password
    const sql = `
    INSERT INTO ${table.user} (username, password)
    VALUES (?, ?)`;
    const placeholder = [userName, password];

    const result = await queryDatabase(sql, placeholder);
    if (result.error) {
        return result;
    }
    // TODO auto login?
    return 'added user';
};

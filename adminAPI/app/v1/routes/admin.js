const express = require('express');
const { queryDatabase } = require('../../database/mariadb');

const router = express.Router();
const routeName = '/auth';

router.post(`${routeName}/register`, register);
router.post(`${routeName}/login`, login);

async function register(req, res) {
    // TODO: Check if the current admin is a super admin
    res.send('register for admin');
}

async function login(req, res) {
    const { email, password } = req.body;
    // TODO: this should be properly escaped to prevent sql injection
    const sql = `CALL get_password_of_admin("${email}")`;
    const data = await queryDatabase(sql);
    let passwordFromDatabase;
    try {
        passwordFromDatabase = data[0][0].password;
        if (password === passwordFromDatabase) {
            // TODO: Create json web token
            res.status(200).json({
                data: 'correct password',
            });
        } else {
            res.status(400).json({
                error: 'incorrect password',
            });
        }
    } catch {
        res.status(400).json({
            error: 'malformed request',
        });
    }
}

module.exports = router;

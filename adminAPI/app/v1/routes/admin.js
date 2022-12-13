const bcrypt = require('bcrypt');

const express = require('express');
const jwt = require('jsonwebtoken');
const { queryDatabase } = require('../../database/mariadb');
const { userSchema } = require('../utils');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const routeName = '/auth';

router.post(`${routeName}/register`, authMiddleware, register);
router.post(`${routeName}/login`, login);

async function register(req, res) {
    try {
        const { email, password } = req.body;
        const validationResult = userSchema.validate({
            email,
            password,
        });

        if (validationResult.error) throw 'InvalidEmailOrPassword';

        const sqlCheckIfSuper = 'CALL check_if_admin_is_super(?)';
        const {
            0: {
                0: { super: superUser },
                // eslint-disable-next-line object-curly-newline
            },
        } = await queryDatabase(sqlCheckIfSuper, [req.decodedEmail]);
        if (!superUser) throw 'NotSuperUser';
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const sql = 'CALL register_admin(?,?)';
        const data = await queryDatabase(sql, [email, passwordHash]);
        if (data.text) throw 'DuplicateEntry';

        res.sendStatus(200);
    } catch (error) {
        switch (error) {
        case 'InvalidEmailOrPassword':
            res.sendStatus(400);
            break;
        case 'DuplicateEntry':
            res.sendStatus(409);
            break;
        case 'NotSuperUser':
            res.sendStatus(401);
            break;

        default:
            res.sendStatus(500);
            break;
        }
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    let passwordFromDatabase;

    const validationResult = userSchema.validate({
        email,
        password,
    });

    try {
        if (validationResult.error) throw 'InvalidEmailOrPassword';

        const sql = 'CALL get_password_of_admin(?)';
        const data = await queryDatabase(sql, [email]);
        passwordFromDatabase = data[0][0].password;
        const passwordCorrect = await bcrypt.compare(
            password,
            passwordFromDatabase
        );

        if (passwordCorrect) {
            const token = jwt.sign(
                {
                    email,
                },
                process.env.ADMIN_JWT_SECRET
            );
            res.status(200).json({
                data: {
                    token,
                },
            });
        } else {
            throw 'InvalidEmailOrPassword';
        }
    } catch {
        res.sendStatus(401);
    }
}

module.exports = router;

const Joi = require('joi');
const bcrypt = require('bcrypt');

const express = require('express');
const jwt = require('jsonwebtoken');
const { queryDatabase } = require('../../database/mariadb');
const { getTokenFrom } = require('../utils');

const router = express.Router();
const routeName = '/auth';

router.post(`${routeName}/register`, authMiddleware, register);
router.post(`${routeName}/login`, login);

function authMiddleware(req, res, next) {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.email) {
        // TODO: Respond only with correct status code
        return res.status(401).json({
            error: 'token missing or invalid',
        });
    }
    req.decodedEmail = decodedToken.email;
    next();
}

async function register(req, res) {
    try {
        const sqlCheckIfSuper = 'CALL check_if_admin_is_super(?)';
        const {
            0: {
                0: { super: superUser },
                // eslint-disable-next-line object-curly-newline
            },
        } = await queryDatabase(sqlCheckIfSuper, [req.decodedEmail]);
        if (!superUser) throw 'CannotRegister';
        const { email, password } = req.body;
        // TODO: Check email and password with joi
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const sql = 'CALL register_admin(?,?)';
        const data = await queryDatabase(sql, [email, passwordHash]);
        if (data.text) throw 'CannotRegister';

        res.sendStatus(200);
    } catch {
        // TODO: Respond only with correct status code
        res.json({
            error: 'could not register',
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    let passwordFromDatabase;
    const userSchema = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net'],
            },
        }),
    });

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
                process.env.SECRET
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
        // TODO: Respond only with correct status code
        res.status(400).json({
            error: 'incorrect credentials',
        });
    }
}

module.exports = router;

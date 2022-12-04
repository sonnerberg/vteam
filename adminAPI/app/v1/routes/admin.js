const Joi = require('joi');

const express = require('express');
const jwt = require('jsonwebtoken');
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
    let passwordFromDatabase;
    let validationResult;
    const userSchema = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net'],
            },
        }),
    });

    // TODO: check if any rows are returned
    try {
        validationResult = userSchema.validate({
            email,
            password,
        });
        if (validationResult.error) throw 'InvalidEmailOrPassword';
        const sql = 'CALL get_password_of_admin(?)';
        const data = await queryDatabase(sql, [email]);
        passwordFromDatabase = data[0][0].password;
        if (!passwordFromDatabase) throw 'InvalidEmailOrPassword';
        if (password === passwordFromDatabase) {
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
        res.status(400).json({
            error: 'incorrect credentials',
        });
    }
}

module.exports = router;

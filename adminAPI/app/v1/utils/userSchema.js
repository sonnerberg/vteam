const Joi = require('joi');

const minPasswordLength = 8;
const maxPasswordLength = 200;
const userSchema = Joi.object({
    password: Joi.string().pattern(
        new RegExp(`^[a-zA-Z0-9]{${minPasswordLength},${maxPasswordLength}}$`)
    ),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net', 'se'],
        },
    }),
});

module.exports = {
    userSchema,
};

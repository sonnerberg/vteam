const { userSchema } = require('./userSchema');
const { getTokenFrom } = require('./getTokenFrom');
const { scooterSchema } = require('./scooterSchema');

module.exports = {
    getTokenFrom,
    userSchema,
    scooterSchema,
};

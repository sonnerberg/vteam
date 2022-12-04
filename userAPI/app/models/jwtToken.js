const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiresIn = '1h';

// middleware to check token
exports.validateToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    // jwt.verify(token, secret, function (err) {
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    message: 'Token is not valid.',
                },
            });
        }
        // Valid token send on the request
        next();
    });
};

exports.createNewToken = (payload) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
};

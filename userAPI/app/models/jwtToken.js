const jwt = require('jsonwebtoken');

const secret = process.env.JWT_USER_SECRET;
const expiresIn = '24h';

// middleware to check token
exports.validateToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log(token);

    // jwt.verify(token, secret, function (err, decoded) {
    jwt.verify(token, secret, function (err) {
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
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
    return {
        data: {
            status: 200,
            message: 'successful login',
            token: token,
            user: payload.userName,
        },
    };
};

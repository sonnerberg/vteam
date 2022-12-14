const jwt = require('jsonwebtoken');
const { getTokenFrom } = require('../utils');

function authMiddleware(req, res, next) {
    const token = getTokenFrom(req);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    } catch {
        // The token is not valid
        return res.sendStatus(401);
    }
    // if (!decodedToken.email) {
    //     // The token does not contain the email property.
    //     //TODO: Is this if check needed ?
    //     return res.sendStatus(401);
    // }
    req.decodedEmail = decodedToken.email;
    next();
}
exports.authMiddleware = authMiddleware;

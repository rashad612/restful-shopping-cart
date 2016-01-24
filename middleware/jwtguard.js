var jwtConfig = require('../config/jwt');

module.exports = function (req, res, next) {
    var token = req.headers['jwt-access-token'];

    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, jwtConfig.TOKEN_SALT, function (err, decodedToken) {
        if (err) {
            return res.sendStatus(401);
        }
        next();
    });
}
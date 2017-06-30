/*jslint node: true, nomen: true */
'use strict';
module.exports = function (passport) {
    var passportJWT = require('passport-jwt'),
        config      = require('./config'),
        JwtStrategy = passportJWT.Strategy,
        extract     = passportJWT.ExtractJwt,
        options     = {
            secretOrKey: config.jwt.secret,
            jwtFromRequest: extract.fromHeader(config.jwt.header),
            algorithm: config.jwt.algorithm
        };

    passport.use(new JwtStrategy(options, function (payload, next) {
        return payload.sub ? next(null, payload.sub) : next(null, false);
    }));
};

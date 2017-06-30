/*jslint node:true */
'use strict';
module.exports = function (app) {
    var jwt      = require('jsonwebtoken'),
        security = require('../configuration/config').jwt,
        async    = require('async');

    return {
        authenticate: function (credentials, callback) {
            async.waterfall([
                function (next) {
                    app.models.user.findOne({ name: credentials.name }, '+password', function (err, user) {
                        if (err) { return next(err); }
                        if (!user) { return next({status: 404, message: 'User not found.'}); }
                        return next(null, user);
                    });
                },
                function (user, next) {
                    user.comparePassword(credentials.password, function (err, match) {
                        if (err) { return next(err); }
                        if (!match) { return next({status: 401, message: 'Wrong password.'}); }
                        var token = jwt.sign({sub: user.name}, security.secret, {algorithm: security.algorithm});
                        return next(null, token);
                    });
                }
            ], callback);
        }
    };
};

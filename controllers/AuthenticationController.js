/*jslint node: true */
'use strict';
module.exports = function (app) {
    var router  = require('express').Router(),
        config  = require('../configuration/config'),
        service = require('../services/AuthenticationService')(app);

    router.route('/').post(function (req, res, next) {
        service.authenticate({name: req.body.name, password: req.body.password}, function (err, token) {
            if (err) { return next(err); }
            if (!token) { return next({status: 500, message: 'Could not create authentication token.'}); }
            return res.json({
                access_token: token,
                token_type: config.jwt.type
            });
        });
    });

    return router;
};

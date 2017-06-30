/*jslint node: true */
'use strict';
module.exports = function (app) {
    var router  = require('express').Router(),
        service = require('../services/UserService')(app);

    router.route('/').post(function (req, res, next) {
        if (!req.body.name) { return next({status: 401, message: 'Would you kindly pass username.'}); }
        if (!req.body.password) { return next({status: 401, message: 'Would you kindly pass password.'}); }
        if (!req.body.confirm) { return next({status: 401, message: 'Would you kindly confirm password.'}); }
        if (req.body.password !== req.body.confirm) { return next({status: 401, message: 'Passwords do not match.'}); }

        service.register({name: req.body.name, password: req.body.name}, function (err, user) {
            if (err) { return next(err); }
            return res.status(201).json({message: 'Successfuly created account for user ' + user.name + '.'});
        });
    });

    return router;
};

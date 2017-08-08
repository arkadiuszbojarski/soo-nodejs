/*jslint node: true, nomen: true */
'use strict';
module.exports = function (app) {
    var router  = require('express').Router(),
        options = require('../configuration/config').passport.options,
        service = require('../services/UserService')(app),
        utils    = require('../utils');

    router.use(app.passport.authenticate('jwt', options));
    router.route('/').get(function (req, res, next) {
        var property = req.query.sort || 'name',
            query = {
                size: req.query.size !== undefined ? parseInt(req.query.size, 10) : 20,
                page: req.query.page !== undefined ? parseInt(req.query.page, 10) : 0,
                search: {},
                sort: {}
            };

        query.search = utils.query(req.query);
        query.sort[property] = req.query[property + '.dir'] || '1';

        service.search(query, function (err, result) {
            if (err) { return next(err); }
            return res.json(new utils.Page(utils.url(req), query.size, query.page, result.users, result.count, 'users'));
        });
    });

    router.route('/:id').get(function (req, res, next) {
        service.read(req.params.id, function (err, user) {
            if (err) { return next(err); }
            if (!user) { return next({status: 404, message: 'User of given id not found.'}); }
            return res.json(utils.dto(utils.url(req), user));
        });
    });

    return router;
};

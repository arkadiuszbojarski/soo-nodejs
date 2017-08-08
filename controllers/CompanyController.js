/*jslint node: true, nomen: true */
'use strict';
module.exports = function (app) {
    var router   = require('express').Router(),
        options  = require('../configuration/config').passport.options,
        service  = require('../services/CompanyService')(app),
        utils     = require('../utils');

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
            return res.json(new utils.Page(utils.url(req), query.size, query.page, result.companies, result.count, 'companies'));
        });
    }).post(function (req, res, next) {
        service.create(req.body, function (err, company) {
            if (err) { return next(err); }
            return res.status(201).json(utils.dto(utils.url(req), company));
        });
    });

    router.route('/:id').get(function (req, res, next) {
        service.read(req.params.id, function (err, company) {
            if (err) { return next(err); }
            if (!company) { return next({status: 404, message: 'Company of given id not found.'}); }
            return res.json(utils.dto(utils.url(req), company));
        });
    }).put(function (req, res, next) {
        service.update(req.params.id, req.body, function (err, company) {
            if (err) { return next(err); }
            if (!company) { return next({status: 404, message: 'Company of given id not found.'}); }
            return res.json(utils.dto(utils.url(req), company));
        });
    }).delete(function (req, res, next) {
        service.delete(req.params.id, function (err) {
            if (err) { return next(err); }
            return res.status(200).json({message: 'Deleted company of given id.'});
        });
    });
    return router;
};

/*jslint node: true, nomen: true */
'use strict';
module.exports = function (app) {
    var router  = require('express').Router(),
        _       = require('lodash'),
        utils    = require('../utils'),
        welcome = {
            _links: {}
        };

    router.route('/').get(function (req, res, next) {
        _.each(app.routes, function (controller, route) {
            if (route === '/') {
                welcome._links.self = {href: utils.url(req)};
            } else {
                welcome._links[route.slice(1)] = {href: utils.url(req) + route};
            }
        });
        res.json(welcome);
    });
    return router;
};

/*jslint node: true */
'use strict';

// modules ================================================
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// configuration ==========================================
var app = express();
var config = require('./configuration/config');
app.set('port', config.app.port);
app.set('ip', config.app.ip);

// connect to mongoDB database ============================
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri);
mongoose.connection.on('connected', function () {

    // REST API's middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride('X-HTTP-Method-Override'));

    // Adding CORS support
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    // Authentication configuration
    require('./configuration/passport')(passport);
    app.use(passport.initialize());
    app.passport = passport;

    // Loading models
    app.models = require('./models/index');

    // Loading routes
    app.routes = require('./routes');
    _.each(app.routes, function (controller, route) {
        app.use(route, controller(app));
    });

    // Error handling
    app.use(function (err, req, res, next) {
        delete err.stack;
        return res.status(err.status || 500).json(err);
    });

    // Start application.
    app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port') + '...');
    });
});

module.exports = app;

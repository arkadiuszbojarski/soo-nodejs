/*jslint node:true */
'use strict';
module.exports = function (app) {
    var async = require('async');

    return {
        search: function (query, callback) {
            async.parallel({
                count: function (next) {
                    app.models.company.count(query.search)
                        .exec(function (err, count) {
                            if (err) { return next(err); }
                            return next(null, count);
                        });
                },
                companies: function (next) {
                    app.models.company.find(query.search)
                        .limit(query.size)
                        .skip(query.page * query.size)
                        .sort(query.sort)
                        .exec(function (err, companies) {
                            if (err) { return next(err); }
                            return next(null, companies);
                        });
                },
            }, callback);
        },
        create: function (company, callback) {
            new app.models.company(company).save(callback);
        },
        read: function (id, callback) {
            app.models.company.findById(id, callback);
        },
        update: function (id, company, callback) {
            app.models.company.findOneAndUpdate(id, company, {new: true}, callback);
        },
        delete: function (id, callback) {
            app.models.company.remove({'_id': id}, callback);
        }
    };
};

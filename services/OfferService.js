/*jslint node:true */
'use strict';
module.exports = function (app) {
    var async = require('async');

    return {
        search: function (query, callback) {
            async.parallel({
                count: function (next) {
                    app.models.offer.count(query.search)
                        .select('-items._id')
                        .exec(function (err, count) {
                            if (err) { return next(err); }
                            return next(null, count);
                        });
                },
                offers: function (next) {
                    app.models.offer.find(query.search)
                        .select('-items._id')
                        .limit(query.size)
                        .skip(query.page * query.size)
                        .sort(query.sort)
                        .exec(function (err, offers) {
                            if (err) { return next(err); }
                            return next(null, offers);
                        });
                },
            }, callback);
        },
        create: function (offer, callback) {
            new app.models.offer(offer).save(callback);
        },
        read: function (id, callback) {
            app.models.offer.findById(id, callback);
        },
        update: function (id, offer, callback) {
            app.models.offer.findOneAndUpdate(id, offer, {new: true}, callback);
        },
        delete: function (id, callback) {
            app.models.offer.remove({'_id': id}, callback);
        }
    };
};

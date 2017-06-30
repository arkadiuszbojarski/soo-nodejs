/*jslint node:true */
'use strict';
module.exports = function (app) {
    var async = require('async');

    return {
        search: function (query, callback) {
            async.parallel({
                count: function (next) {
                    app.models.user.count(query.search)
                        .exec(function (err, count) {
                            if (err) { return next(err); }
                            return next(null, count);
                        });
                },
                users: function (next) {
                    app.models.user.find(query.search)
                        .limit(query.size)
                        .skip(query.page * query.size)
                        .sort(query.sort)
                        .exec(function (err, users) {
                            if (err) { return next(err); }
                            return next(null, users);
                        });
                },
            }, callback);
        },
        register: function (user, callback) {
            new app.models.user(user).save(callback);
        },
        read: function (id, callback) {
            app.models.user.findById(id, callback);
        },
        update: function (id, user, callback) {
            app.models.user.findOneAndUpdate(id, user, {new: true}, callback);
        },
        unregister: function (id, callback) {
            app.models.user.remove({'_id': id}, callback);
        }
    };
};

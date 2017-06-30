/*jslint node: true */
'use strict';
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, unique: true, required: true},
    password: {type: String, required: true, select: false}
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password') && !this.isNew) { return next(); }

    var user = this;
    bcrypt.genSalt(function (err, salt) {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) { return next(err); }
            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) { return next(err); }
        return next(null, match);
    });
};

module.exports = mongoose.model('User', UserSchema);

/*jslint node: true */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    address: {type: String, maxlength: 500}
});

module.exports = mongoose.model('Company', CompanySchema);

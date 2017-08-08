/*jslint node: true */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    number: {type: String, required: true},
    basis: {type: String},
    payment: {type: String},
    delivery: {type: String},
    comment: {type: String},
    recipient: {type: Schema.Types.ObjectId, ref: 'Company'},
    created: {type: Date, default: Date.now},
    validity: {type: Date},
    items: [{
        name: {type: String, required: true},
        comment: {type: String},
        amount: {
            quantity: {type: Number},
            unit: {type: String, required: true}
        },
        price: {type: Number},
        realization: {
            days: {type: Number},
            hours: {type: Number},
            minutes: {type: Number}
        }
    }]
});

module.exports = mongoose.model('Offer', OfferSchema);

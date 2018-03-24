'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var AntiqueModel = require('./antiqueModel');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    createdAntiques: [{
        type: Schema.Types.ObjectId,
        ref: "RouteModel"
    }],
    editedAntiques: [{
        type: Schema.Types.ObjectId,
        ref: "PlaceModel"
    }]
}, {
        timestamps: true
    });


User.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('User', User);

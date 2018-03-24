
'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var UserModel = require('./userModel');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Antique = new Schema({
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
        ref: "UserModel"
    }],
    editedAntiques: [{
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }]
}, {
        timestamps: true
    });


Antique.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('Antique', Antique);

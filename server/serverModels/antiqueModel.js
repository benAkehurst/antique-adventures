
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
    name: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    condition: {
        type: String
    },
    width: {
        type: String
    },
    height: {
        type: String
    },
    depth: {
        type: String
    },
    material: {
        type: String
    },
    location: {
        type: String
    },
    provenance: {
        type: String
    },
    provenanceImage: {
        type: String
    },
    createdBy: [{
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }],
    editedBy: [{
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }],
    status: {
        type: String
    }
}, {
        timestamps: true
    });


Antique.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('Antique', Antique);

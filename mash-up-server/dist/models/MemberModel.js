'use strict';

var mongoose = require('mongoose');
var mongooseConnection = require('../globals/MongoDbConfig');
var validator = require('validator');
var randomstring = require("randomstring");
var memberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
        default: function _default() {
            return randomstring.generate({
                length: 12,
                charset: 'alphanumeric'
            });
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    projects: {
        admin: [{
            type: mongoose.Schema.Types.String,
            ref: 'Project',
            field: 'projectId'
        }],
        user: [{
            type: mongoose.Schema.Types.String,
            ref: 'Project',
            field: 'projectId'
        }]
    },
    deleted: { type: Boolean, required: false }
});

var Member = mongoose.model('Member', memberSchema, 'users');
module.exports = { Member: Member, memberSchema: memberSchema };
//# sourceMappingURL=MemberModel.js.map
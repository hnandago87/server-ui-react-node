'use strict';

var _underscore = require('underscore');

var mongoose = require('mongoose');

var mongooseConnection = require('../globals/MongoDbConfig');
var validator = require('validator');
var randomstring = require("randomstring");
var Schema = mongoose.Schema;

var OrganizationSchema = new mongoose.Schema({
    OrganizationName: {
        type: String,
        required: true,
        unique: true
    },
    OrganizationCode: {
        required: true,
        type: String,
        default: randomstring.generate({
            length: 12,
            charset: 'alphanumeric'
        }),
        unique: true
    },
    OrganizationProjects: [{ type: mongoose.Schema.Types.String, ref: 'Project', field: 'projectId' }],
    admins: [{ type: mongoose.Schema.Types.String, ref: 'Member', field: 'memberId' }],
    users: [{ type: mongoose.Schema.Types.String, ref: 'Member', field: 'memberId' }]
});

OrganizationSchema.statics.getProjects = function (organizaionCode) {
    return this.findOne({ "OrganizationCode": organizaionCode }).then(function (data) {
        return data;
    });
};

OrganizationSchema.methods.saveOrganization = function () {
    var organization = this;
    return organization.save().then(function (data) {
        return data;
    });
};

var Organization = mongoose.model('Organization', OrganizationSchema, 'projectOrganization');
module.exports = { Organization: Organization, OrganizationSchema: OrganizationSchema };
//# sourceMappingURL=OrganizationModal.js.map
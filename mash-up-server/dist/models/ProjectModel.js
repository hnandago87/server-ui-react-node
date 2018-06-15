'use strict';

var _async = require('async');

var mongoose = require('mongoose');
var mongooseConnection = require('../globals/MongoDbConfig');
var validator = require('validator');
var randomstring = require("randomstring");

var projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        unique: true,
        default: function _default() {
            return randomstring.generate({
                length: 12,
                charset: 'alphanumeric'
            });
        }
    },
    cost: {
        type: String,
        required: false
    },
    memberCount: {
        type: Number,
        required: true
    },
    members: [{ type: mongoose.Schema.Types.Mixed, ref: 'Member', field: 'memberId' }],
    active: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    OrganizationCode: {
        type: mongoose.Schema.Types.String, ref: 'Organization', field: 'OrganizationCode'
    }
});

projectSchema.statics.getMembers = function () {};

projectSchema.statics.getProject = function (projectId, OrganizationCode) {
    return this.findOne({ "projectId": projectId, "OrganizationCode": OrganizationCode }).then(function (data) {
        return data;
    });
};

function getData(fromMap, next) {
    console.log("calling member");
    mongoose.model('Member').find({ "memberId": { $in: fromMap } }, function (err, result) {
        if (err) {
            console.log("member findOne error");
            console.log(err);
            next(err, null);
        } else {
            console.log("found member data");
            console.log(result);
            next(null, result);
        }
    });
    // mongoose.model('Member').findOne({"memberId":fromMap}, (err, result)=>{
    //     if(!err){
    //         console.log("found member data")
    //         console.log(result)
    //         next(null,result);
    //     }else{
    //         console.log("member findOne error")
    //         console.log(err)
    //         next(err,null);
    //     }
    // });
}
projectSchema.pre('save', function (next) {
    var self = this;
});

projectSchema.post('findOne', function (fetchedData, res) {
    console.log("calling post fetch");
    var self = this;
    getData(fetchedData.members, function (err, result) {
        console.log("post fetch");
        if (err) {} else {
            fetchedData["members"] = result;
        }
        res();
    });
    // map(fetchedData.members,getData, function(err, result){
    //     console.log("post fetch");
    //     if(err){
    //     }else{
    //         next["members"] = result;
    //     }
    //    res();
    // });
});

var Project = mongoose.model('Project', projectSchema, 'projects');
module.exports = { Project: Project, projectSchema: projectSchema };
//# sourceMappingURL=ProjectModel.js.map
var mongoose = require('mongoose');
import {map, where, find, contains, has, some} from 'underscore'
var mongooseConnection = require('../globals/MongoDbConfig');
const validator = require('validator');
const randomstring = require("randomstring");
var Schema = mongoose.Schema;

var OrganizationSchema = new mongoose.Schema({
    OrganizationName:{
        type:String,
        required:true,
        unique:true
    },
    OrganizationCode:{
        required:true,
        type:String,
        default:randomstring.generate({
            length: 12,
            charset: 'alphanumeric'
        }),
        unique:true
    },
    OrganizationProjects:[{type: mongoose.Schema.Types.String, ref: 'Project', field:'projectId'}],
    admins:[{type: mongoose.Schema.Types.String, ref: 'Member', field:'memberId'}],
    users:[{type: mongoose.Schema.Types.String, ref: 'Member', field:'memberId'}],
});

OrganizationSchema.statics.getProjects = function(organizaionCode){
    console.log("calling find one for get projects")
    return this.findOne({"OrganizationCode":organizaionCode}).then(function(data){return data});
}

OrganizationSchema.methods.saveOrganization = function(){
    var organization = this;
    return organization.save().then(function(data){
        return data
    });
}

function autoPopulateSubs(next) {
    console.log("pre populate calling");
  this.populate('Project');
  this.populate('Member');
  next();
}

OrganizationSchema
  .pre('findOne', autoPopulateSubs)
  .pre('find', autoPopulateSubs);

const Organization = mongoose.model('Organization', OrganizationSchema,'projectOrganization');
module.exports = {Organization};
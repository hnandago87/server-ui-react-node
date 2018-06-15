'use strict';
var mongoose = require('mongoose');
var mongooseConnection = require('../globals/MongoDbConfig');
const validator = require('validator');
const randomstring = require("randomstring");
const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    projectId:{
        type:String,
        unique:true,
        default:function(){
            return randomstring.generate({
                length: 12,
                charset: 'alphanumeric'
            });
        }
    },
    cost:{
        type:String,
        required:false
    },
    memberCount:{
        type:Number,
        required:true
    },
    members:[
        {type: mongoose.Schema.Types.Mixed, ref: 'Member', field:'memberId'}
    ],
    active:{
        type:Boolean,
        default:false
    },
    startDate:{
        type:Date,
        required:false
    },
    endDate:{
        type:Date,
        required:false
    },
    OrganizationCode:{
        type:mongoose.Schema.Types.String, ref:'Organization', field:'OrganizationCode'
    }
});

projectSchema.statics.getMembers = function(){}

projectSchema.statics.getProject = function(projectId, OrganizationCode){
    return this.findOne({"projectId":projectId,"OrganizationCode":OrganizationCode}).then((data)=>{return data})
}

function getData(fromMap,next){
    console.log("calling member")
    mongoose.model('Member').find({"memberId":{$in:fromMap}},(err,result)=>{
        if(err){
            console.log("member findOne error")
            console.log(err)
            next(err,null);
        }else{
            console.log("found member data")
            console.log(result)
            next(null,result);
        }
    });
}
projectSchema.pre('save', function(next){
    let self = this;
    self.memberCount = self.members.length;
    next();
});

projectSchema.post('findOne', function(fetchedData, res){
    console.log("calling post fetch")
    let self = this;
    getData(fetchedData.members,(err,result)=>{
        console.log("post fetch");
        if(err){
        }else{
            fetchedData["members"] = result;
        }
       res();
    });
});

var Project = mongoose.model('Project', projectSchema,'projects');
module.exports = {Project,projectSchema}
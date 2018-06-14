var mongoose = require('mongoose');
var mongooseConnection = require('../globals/MongoDbConfig');
const validator = require('validator');
const randomstring = require("randomstring");

var projectSchema = new mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
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
        {type: mongoose.Schema.Types.String, ref: 'Member', field:'memberId'}
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
projectSchema.methods.addMembers = function(member){
    var project = this;
    project.members.push(member);
    return project;
}
projectSchema.statics.removeMembers = function(memberName){
    var project = this;
    delete project.members.memberName;
}
projectSchema.statics.changeStatus = function(member){
    return this;
}

projectSchema.statics.getProject = function(projectId, OrganizationCode){
    return this.findOne({"projectId":projectId,"OrganizationCode":OrganizationCode}).populate('member').then((data)=>{return data})
}

projectSchema.virtual('member', {
  ref: 'Member',
  localField: 'Members',
  foreignField: 'memberId',
  justOne: true // for many-to-1 relationships
});


function autoPopulateMember(next) {
  this.populate('Member');
  next();
}

projectSchema
  .pre('findOne', autoPopulateMember)
  .pre('find', autoPopulateMember);
const Project = mongoose.model('Project', projectSchema);

module.exports = {Project,projectSchema};
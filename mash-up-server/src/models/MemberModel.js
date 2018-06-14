const mongoose = require('mongoose');
const mongooseConnection = require('../globals/MongoDbConfig');
const validator = require('validator');
const randomstring = require("randomstring");
var memberSchema = new mongoose.Schema(
    {
        _id: {
            type:mongoose.Schema.Types.ObjectId
        },
        memberId:{
            type:String,
            required:true,
            default:function(){
                return randomstring.generate({
                    length: 12,
                    charset: 'alphanumeric'
                });
            }
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        dateOfBirth:{
            type:Date,
            required:true
        },
        projects:{
            admin:[{
                type:mongoose.Schema.Types.String,
                ref:'Project',
                field:'projectId'
            }],
            user:[{
                type:mongoose.Schema.Types.String,
                ref:'Project',
                field:'projectId'
            }]
        },
        deleted:{type:Boolean,required:false}
    }
);
const Member = mongoose.model('Member', memberSchema,'users');
module.exports = {Member};
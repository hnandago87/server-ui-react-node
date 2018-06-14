import mongoose from 'mongoose';
import {mongooseConnection} from '../globals/MongoDbConfig';
const validator = require('validator');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");
const jwt = require('jsonwebtoken');
import {JWTSecret} from '../globals/DbConfig';

var userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        validate: {
            validator:validator.isEmail,
            message:"Not a valid email"
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6
    },
    role:{
        type:String,
        required:false
    },
    organizationCode:{
        required:true,
        type:String
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});
userSchema.methods.generateAuthToken = function(){
    var user = this;
    user.isNew = false;
    var access = randomstring.generate({
        length: 12,
        charset: 'alphanumeric'
    });
    var token = jwt.sign({"user":user.email,"role":user.role,"organizationCode":user.organizationCode, access},JWTSecret).toString();
    user.tokens.push({access,token});
    return user.save().then(()=>{
        return token;
    });
}
userSchema.methods.removeToken = function(token){
    var user =  this;
    user.tokens = user.tokens.filter((el)=>{
        return el.token != token
    });
    return user.save().then((result)=>{
        return result;
    })
}
userSchema.statics.findUserByEmail = function(email){
    var User = this;
    return User.findOne({"email":email})
}
userSchema.statics.comparePassword = function(clientPassword, hashedPassword){
    return bcrypt.compare(clientPassword, hashedPassword);
}

userSchema.statics.findUserByToken = function(token){
    var User = this;
    return User.findOne({"tokens.token":token});
}
var User = mongoose.model('User', userSchema,'userLogin');



module.exports = {User};

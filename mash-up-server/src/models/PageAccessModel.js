import mongoose from 'mongoose';
import {mongooseConnection} from '../globals/MongoDbConfig';
import {map, where, find} from 'underscore'
const validator = require('validator');

var pageAccessSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate: {
            validator:validator.isEmail,
            message:"Not a valid email"
        }
    },
    pageAccess:[{
        pageName:{
            type:String,
            required:true
        },
        access:{
            defaultView:{
                type:String,
                required:true,
            },
            switchable:{
                type:Boolean,
                default:false
            },
            switchablePages:{
                type:[String],
                required:true
            }
        }

    }]
});
pageAccessSchema.methods.removeAccess = function(pageAccess){
    let user = this;
    let updtedAccess = user.pageAccess.map(function(page){
        if(page.pageName == pageAccess.pageName){
            page.access = pageAccess.access
        }
    });
    user.pageAccess = updatedAccess;
    return user.save().then((result)=>{
        return result;
    });
}
pageAccessSchema.methods.addAccess = function(pageAccess){
    let user = this;
    let numberOfPages = user.pageAccess.length;
    if(where(user.pageAccess,pageAccess).length == 0){
        user.pageAccess.push(pageAccess);
    }
    if(numberOfPages< user.pageAccess.length){
        return user.save().then((result)=>{
            return result;
        })
    } else {
        return 0;
    }
}
pageAccessSchema.statics.findUserByEmail = function(email){
    var user = this;
    return user.findOne({"_id":email})
};
pageAccessSchema.statics.findPageAccessForUser = function(email, pageName){
    var user = this;
    return user.findOne({"_id":email}).then((result)=>{
        console.log(result)
        if(result){
           return find(result.pageAccess,(access)=>{
                return access.pageName == pageName;
            });
        }
    });
}

var PageAccess = mongoose.model('PageAccess', pageAccessSchema,'pageAccess');
module.exports = {PageAccess};
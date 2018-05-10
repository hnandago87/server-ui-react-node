import express from 'express';
import {getUserAccess} from '../../controllers/PageAccessController/pageAccessController'
const PageAccess = express.Router();
PageAccess.get('/',(req, res, next)=>{
    res.send({"title":"Welcome to Page Access Management for all users"});
})

PageAccess.get('/access/:page',[getUserAccess],(req,res,next)=>{
    console.log("page access call done");
});
module.exports = PageAccess;
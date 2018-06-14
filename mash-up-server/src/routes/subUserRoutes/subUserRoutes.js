const express = require('express');
import {verifyJwtToken} from '../../controllers/SubUserManagament/SubUserController';
import {validateAdminRole} from '../../controllers/SubUserManagament/SubUserController';
const subUserManagement = express.Router();

subUserManagement.get('/',[validateAdminRole], (req,res,next)=>{
    res.send({"title":"welcome to User management"});
});

subUserManagement.post('/generate-user',[validateAdminRole], (req,res,next)=>{
    
    res.send({"title":"Generate User Profile"});
});

module.exports = subUserManagement;
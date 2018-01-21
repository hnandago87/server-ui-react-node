const express = require('express');
import {User} from '../models/UserManagementModels'
import { verifyJwtToken } from '../controllers/VerifyJWTToken';
import {initialLoginValidation,signUserJwtToken,verifyAndRemoveUser} from '../controllers/UserManagementController';
const userManagement = express.Router();


//Routes for User Management defined
userManagement.get('/login', (req, res, next)=>{
    res.send("Hello");
});

userManagement.post('/login',
         [initialLoginValidation,signUserJwtToken],
    (req, res, next)=>{
        res.send({"token":req.token,"email":req.user.email,"loggedIn":true,"role":req.user.role});
});
userManagement.post('/logout',[verifyAndRemoveUser],(req, res, next)=>{
    res.send({"data":"done"});
});

module.exports = userManagement;


//$2a$10$NhmWT1PIfewk5fW0IugBR.cZLtfBBffIH3bt9foteoCTaHGF3XreK
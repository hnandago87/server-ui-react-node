const express = require('express');

const projectManagement = express.Router();

projectManagement.get('/', (req,res,next)=>{
    res.send({"title":"welcome to project management"});
});

//if Global Admin access project
//If Project Admin, provide access
//If project user, restrict access
projectManagement.get('/projects',[validateAdminRole],(req, res, next)=>{
    
});
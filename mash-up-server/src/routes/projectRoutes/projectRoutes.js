const express = require('express');
import {validateAdminRole, getProjects,getProject,addOrganization
} from '../../controllers/SubUserManagament/SubUserController.js';

const projectManagement = express.Router();


projectManagement.get('/', (req,res,next)=>{
    res.send({"title":"welcome to project management"});
});

//if Global Admin access project
//If Project Admin, provide access
//If project user, restrict access
projectManagement.get('/organization/:organizationCode',[validateAdminRole],(req, res, next)=>{
    getProjects(req,res);
});

//Add new organization
projectManagement.post('/organization',[validateAdminRole], (req, res,next)=>{
    addOrganization(req,res,next);
});

//Manipulate existing project
projectManagement.all('/organization/:organizationCode/projects/:projectId',[validateAdminRole],(req, res, next)=>{
    getProject(req,res,next);
});

// //Create new project
// projectManagement.post('/organization/:organizationCode/project',[validateAdminRole],(req, res, next)=>{
//     addProject(req,res,next);
// });


module.exports = projectManagement;

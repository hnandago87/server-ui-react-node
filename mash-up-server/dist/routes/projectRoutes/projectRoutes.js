'use strict';

var _SubUserController = require('../../controllers/SubUserManagament/SubUserController.js');

var express = require('express');


var projectManagement = express.Router();

projectManagement.get('/', function (req, res, next) {
    res.send({ "title": "welcome to project management" });
});

//if Global Admin access project
//If Project Admin, provide access
//If project user, restrict access
projectManagement.get('/organization/:organizationCode', [_SubUserController.validateAdminRole], function (req, res, next) {
    (0, _SubUserController.getProjects)(req, res);
});

//Add new organization
projectManagement.post('/organization', [_SubUserController.validateAdminRole], function (req, res, next) {
    (0, _SubUserController.addOrganization)(req, res, next);
});

//Manipulate existing project
projectManagement.all('/organization/:organizationCode/projects/:projectId', [_SubUserController.validateAdminRole], function (req, res, next) {
    (0, _SubUserController.getProject)(req, res, next);
});

//Create new project
projectManagement.post('/organization/:organizationCode/project', [_SubUserController.validateAdminRole], function (req, res, next) {
    addProject(req, res, next);
});

module.exports = projectManagement;
//# sourceMappingURL=projectRoutes.js.map
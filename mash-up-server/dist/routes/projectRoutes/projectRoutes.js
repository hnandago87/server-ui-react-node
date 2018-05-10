'use strict';

var express = require('express');

var projectManagement = express.Router();

projectManagement.get('/', function (req, res, next) {
    res.send({ "title": "welcome to project management" });
});

//if Global Admin access project
//If Project Admin, provide access
//If project user, restrict access
projectManagement.get('/project/:projectId', [validateUserCredentials], function (req, res, next) {});
//# sourceMappingURL=projectRoutes.js.map
'use strict';

var express = require('express');

var projectManagement = express.Router();

projectManagement.get('/', function (req, res, next) {
    res.send({ "title": "welcome to project management" });
});
//# sourceMappingURL=projectRoutes.js.map
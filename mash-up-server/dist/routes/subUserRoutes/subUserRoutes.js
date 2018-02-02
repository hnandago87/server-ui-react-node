'use strict';

var express = require('express');

var subUserManagement = express.Router();

subUserManagement.get('/', [validateAdminRole], function (req, res, next) {
    res.send({ "title": "welcome to User management" });
});

subUserManagement.post('/generate-user', function (req, res, next) {
    res.send({ "title": "Generate User Profile" });
});
//# sourceMappingURL=subUserRoutes.js.map
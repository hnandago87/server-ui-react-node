'use strict';

var express = require('express');

var userManagement = express.Router();

userManagement.all('/', function (req, res, next) {
    res.send({ "hello": "Hello from users where all login and logout will be managed" });
});

module.exports = userManagement;
//# sourceMappingURL=userManagementRoute.js.map
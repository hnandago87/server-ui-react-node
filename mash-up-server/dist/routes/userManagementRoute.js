'use strict';

var _UserManagementModels = require('../models/UserManagementModels');

var _UserManagementController = require('../controllers/UserManagementController');

var express = require('express');

var userManagement = express.Router();

//Routes for User Management defined
userManagement.get('/login', function (req, res, next) {
    res.send("Hello");
});

userManagement.post('/login', [_UserManagementController.initialLoginValidation, _UserManagementController.signUserJwtToken], function (req, res, next) {
    res.send({ "token": req.token, "email": req.user.email, "loggedIn": true, "role": req.user.role });
});
userManagement.post('/logout', [_UserManagementController.verifyAndRemoveUser], function (req, res, next) {
    res.send({ "data": "done" });
});

module.exports = userManagement;

//$2a$10$NhmWT1PIfewk5fW0IugBR.cZLtfBBffIH3bt9foteoCTaHGF3XreK
//# sourceMappingURL=userManagementRoute.js.map
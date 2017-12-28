'use strict';

var express = require('express');

var _require = require('../models/UserManagementModels'),
    User = _require.User;

var userManagement = express.Router();

var initialLoginValidation = function initialLoginValidation(req, res, next) {
    console.log("Validation called");
    if (req.body.email == "" || req.body.password.length > 16 || req.body.password.length < 8) {
        res.status(401).send("Not allowed");
    } else {
        User.findUserByEmail(req.body.email).then(function (user) {
            if (!user) {
                res.send({ "error": true });
            } else {
                User.comparePassword(req.body.password, user.password).then(function (res) {
                    if (!res) {
                        res.send({ "error": true });
                    } else {
                        req.user = { "error": false, "_id": user._id, "email": user.email, "password": user.password, "role": user.role };
                        next();
                    }
                });
            }
        });
    }
};
var signUserJwtToken = function signUserJwtToken(req, res, next) {
    if (!req.user.error) {
        var user = new User({ "_id": req.user._id, "email": req.user.email, "password": req.user.password, "role": req.user.role });
        user.generateAuthToken().then(function (token) {
            req.cookies.token = token;
            req.token = token;
            next();
        }).catch(function (err) {
            console.log(err);
        });
    } else {
        res.status(400).send({ "error": "something went wrong" });
    }
};
//Routes for User Management defined
userManagement.get('/login', function (req, res, next) {
    res.send("Hello");
});

userManagement.post('/login', [initialLoginValidation, signUserJwtToken], function (req, res, next) {
    res.send({ "token": req.token, "email": req.user.email, "loggedIn": true, "role": req.user.role });
});

module.exports = userManagement;

//$2a$10$NhmWT1PIfewk5fW0IugBR.cZLtfBBffIH3bt9foteoCTaHGF3XreK
//# sourceMappingURL=userManagementRoute.js.map
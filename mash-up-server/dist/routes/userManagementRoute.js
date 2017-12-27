'use strict';

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var _require = require('../models/UserManagementModels'),
    User = _require.User;

var userManagement = express.Router();

var strategy = new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true }, function (req, username, password, done) {
    console.log("+++++++++++++++++");
    console.log(username);
    console.log("+++++++++++++++++");
    User.findUserByEmail(username).then(function (user) {
        console.log(user);
        if (!user) {
            return done({ "error": true }, null);
        } else {
            User.comparePassword(password, user.password).then(function (res) {
                if (!res) {
                    return done({ "error": true }, null);
                } else {
                    return done(null, { "error": false, "_id": user._id, "email": user.email, "password": user.password, "role": user.role });
                }
            });
        }
    });
});
var initialLoginValidation = function initialLoginValidation(req, res, next) {
    console.log("Validation called");
    if (req.body.email == "" || req.body.password.length > 16 || req.body.password.length < 8) {
        res.status(401).send("Not allowed");
    } else {
        next();
    }
};
var signUserJwtToken = function signUserJwtToken(req, res, next) {
    if (!req.user.error) {
        var user = new User({ "_id": req.user._id, "email": req.user.email, "password": req.user.password, "role": req.user.role });
        user.generateAuthToken().then(function (token) {
            req.token = token;
            next();
        }).catch(function (err) {
            console.log(err);
        });
    } else {
        res.status(400).send({ "error": "something went wrong" });
    }
};
//Everything that is done after request passed
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(strategy);

//Routes for User Management defined
userManagement.get('/login', function (req, res, next) {
    res.send("Hello");
});

userManagement.post('/login', [initialLoginValidation, passport.authenticate('local', { session: false }), signUserJwtToken], function (req, res, next) {
    res.send({ "token": req.token, "email": req.user.email, "loggedIn": true, "role": req.user.role });
});

module.exports = userManagement;
//# sourceMappingURL=userManagementRoute.js.map
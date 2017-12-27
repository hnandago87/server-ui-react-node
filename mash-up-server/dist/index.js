'use strict';

var _DbConfig = require('./globals/DbConfig');

var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ejwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var mongo = require('mongodb');
var mongoose = require('mongoose');


var db = mongoose.connection;
var userManagement = require('./routes/userManagementRoute');

var app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../mash-up-ui/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Handle session
app.use(session({
    secret: _DbConfig.secretKey,
    saveUninitialized: _DbConfig.saveUninitialized,
    resave: _DbConfig.resave
}));
//Handle authentication
app.use(passport.initialize());
// app.use(passport.session());

//express validator

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "*");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/usersLogin', userManagement);

//Any route that does not match the given route, it serves front end.
app.get('*', function (req, res, next) {
    res.cookie("h", "h");next();
}, function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

var port = process.env.PORT || 5000;
app.listen(port);

//TODO
// 1. User Model work on generating auth token with JWT
// 2. Send to middleware
// 3. send to response as cookie
//# sourceMappingURL=index.js.map
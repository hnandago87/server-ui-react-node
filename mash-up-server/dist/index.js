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
app.use(express.static(path.join(__dirname, '../../mash-up-ui/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/usersLogin', userManagement);

var port = process.env.PORT || 5000;
app.listen(port);
//# sourceMappingURL=index.js.map
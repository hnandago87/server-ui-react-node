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
var PageAccess = require('./routes/pageAccess/PageAccessRoute');
var projectManagement = require('./routes/projectRoutes/projectRoutes');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(_DbConfig.secretKey));
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   cookieName:"gsessionID",
//   secret: sessionKey,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true },
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000
// }));
// app.use(session({
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: sessionKey
// }));
app.use(function (req, res, next) {
    console.log(req.headers);
    //  res.header("Access-Control-Allow-Origin", "*");
    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // res.header('Access-Control-Allow-Headers', "*");
    // res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/usersLogin', userManagement);
app.use('/page', PageAccess);
app.use('/manage', projectManagement);

var port = process.env.PORT || 5000;
app.listen(port);
//# sourceMappingURL=index.js.map
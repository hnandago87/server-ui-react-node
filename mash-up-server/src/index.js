const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongo = require('mongodb');
const mongoose =  require('mongoose');
import {secretKey,saveUninitialized,resave,sessionKey} from './globals/DbConfig';


const db = mongoose.connection;
const userManagement = require('./routes/userManagementRoute')
const PageAccess = require('./routes/pageAccess/PageAccessRoute')

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser(secretKey));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  cookieName:"gsessionID",
  secret: sessionKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: sessionKey
}))
app.use(function (req, res, next) {
    console.log(req.headers)
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

app.use('/usersLogin',userManagement);
app.use('/page',PageAccess)

const port = process.env.PORT || 5000;
app.listen(port);
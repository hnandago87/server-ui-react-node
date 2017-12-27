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
import {secretKey,saveUninitialized,resave} from './globals/DbConfig';

const db = mongoose.connection;
const userManagement = require('./routes/userManagementRoute')

const app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname,'../../mash-up-ui/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//Handle session
app.use(session({
    secret:secretKey,
    saveUninitialized: saveUninitialized,
    resave:resave
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

app.use('/usersLogin',userManagement);

//Any route that does not match the given route, it serves front end.
app.get('*', (req, res, next)=>{res.cookie("h","h"); next()},(req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);





//TODO
// 1. User Model work on generating auth token with JWT
// 2. Send to middleware
// 3. send to response as cookie 
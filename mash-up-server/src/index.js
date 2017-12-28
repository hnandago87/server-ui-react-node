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
app.use(express.static(path.join(__dirname,'../../mash-up-ui/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/usersLogin',userManagement);

const port = process.env.PORT || 5000;
app.listen(port);
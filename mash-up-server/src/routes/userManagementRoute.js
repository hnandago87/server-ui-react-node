const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/UserManagementModels')
const userManagement = express.Router();

const strategy = new LocalStrategy({usernameField:"email", passwordField:"password",passReqToCallback: true},
  function(req,username,password, done) {
      console.log("+++++++++++++++++")
      console.log(username)
      console.log("+++++++++++++++++")
      User.findUserByEmail(username).then((user)=>{
          console.log(user)
          if(!user){
               return done({"error":true}, null)
           } else {
              User.comparePassword(password, user.password).then((res)=>{
                  if(!res){
                      return done({"error":true}, null)
                  } else {
                      return done(null, {"error":false,"_id":user._id,"email":user.email,"password":user.password,"role":user.role})
                  }
              }); 
           }
      });
  }
);
const initialLoginValidation = function(req, res, next){
    console.log("Validation called")
    if(req.body.email == "" || req.body.password.length>16 || req.body.password.length<8){
        res.status(401).send("Not allowed")
    } else {
        next();
    }
}
const signUserJwtToken =  function(req, res, next){
    if(!req.user.error){
        var user = new User({"_id":req.user._id,"email":req.user.email,"password":req.user.password,"role":req.user.role});
        user.generateAuthToken().then((token)=>{
            req.token = token
            next();
        }).catch((err)=>{
            console.log(err)
        });
    }else{
        res.status(400).send({"error":"something went wrong"});
    }
}
//Everything that is done after request passed
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});
passport.use(strategy);


//Routes for User Management defined
userManagement.get('/login', (req, res, next)=>{
    res.send("Hello");
});

userManagement.post('/login',
        [initialLoginValidation,passport.authenticate('local',{session:false}),signUserJwtToken],
    (req, res, next)=>{
        res.send({"token":req.token,"email":req.user.email,"loggedIn":true,"role":req.user.role});
});

module.exports = userManagement;
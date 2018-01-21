import {User} from '../models/UserManagementModels'
import { verifyJwtToken } from '../controllers/VerifyJWTToken'


export function initialLoginValidation(req, res, next){
    if(req.body.email == "" || req.body.password.length>16 || req.body.password.length<8){
        res.status(401).send("Not allowed")
    } else {
          User.findUserByEmail(req.body.email).then((user)=>{
          if(!user){
               res.status(401).send({"error":true})
           } else {
              User.comparePassword(req.body.password, user.password).then((res)=>{
                  if(!res){
                      res.send({"error":true})
                  } else {
                      req.user = {"error":false,"_id":user._id,"email":user.email,"password":user.password,"role":user.role};
                      next();
                  }
              }); 
           }
      });
    }
}
export function signUserJwtToken (req, res, next){
    if(!req.user.error){
        var user = new User({"_id":req.user._id,"email":req.user.email,"password":req.user.password,"role":req.user.role});
        user.generateAuthToken().then((token)=>{
            req.cookies.token = token
            req.token = token
            next();
        }).catch((err)=>{
            res.status(403).send({"error":"Error while performing action"})
        });
    }else{
        res.status(400).send({"error":"something went wrong"});
    }
}
export function verifyAndRemoveUser(req, res, next){
    if(req.body.token){
        User.findUserByToken(req.body.token).then((user)=>{
            if(user!==null && user.email === req.body.email){
                var loggedInUser = new User(user);
                verifyJwtToken(req.body.token).then((decodedToken)=>{
                    if(decodedToken && decodedToken.user === req.body.email){
                        loggedInUser.removeToken(req.body.token).then((user)=>{
                           next();
                        })
                    } else {
                        res.status(401).send({"error":"Action failed"})
                    }
                })
            } else{
                res.status(401).send({"error":"Cannot perform action"});
            }
        })
    }
    else {
        res.status(401).send({"error":"Can't perform action"});
    }
}
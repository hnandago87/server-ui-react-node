import parallel from 'async/parallel';
import {verifyJwtToken} from '../globalController/VerifyJWTToken'
import {User} from '../../models/UserManagementModels'
import {PageAccess} from '../../models/PageAccessModel'
export function getUserAccess(req,res,next){
    console.log("called page access controller")
    verifyJwtToken(req.headers['x-auth-token']).then((decodedToken)=>{
        if(decodedToken.user){
            parallel([
                function(callback){
                    validateToken(req.headers['x-auth-token'], decodedToken.user, callback);
                }, function(callback){
                    findUserAccessForPage(decodedToken.user, req.params.page, callback);
                }
            ], (err, result)=>{
                //check if any one is null or error, if error send bad response and if success send the required access.
                if(!err){
                    if(result[0] && result[1]){
                        console.log("1")
                        res.send(result[1])
                    }
                } else {
                    console.log("error")
                }
            })
        }
    })
}

//Helper methods can be added for the main controller functions exposed to the API routes.
function validateToken(token, userEmail, callback){
    User.findUserByToken(token).then((user)=>{
        if(user!=null){
             if(user.email == userEmail){
                 callback(null, true);
             } else{
                callback(null, false);
             }
        } else{
            callback(null, false)
        }  
    }).catch((err)=>{
        callback(err, null);
    });
    
}

function findUserAccessForPage(email, page, callback){
    console.log(email+" - "+page)
    //call the model and get the access for the page
    PageAccess.findPageAccessForUser(email, page).then((result)=>{
        console.log("result")
        callback(null,result);
    }).catch((err)=>{
        callback(err,null);
    });
   
}
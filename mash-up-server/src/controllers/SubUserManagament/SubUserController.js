import {User} from '../models/UserManagementModels'
import { verifyJwtToken } from '../controllers/globalController/VerifyJWTToken'

export function validateAdminRole(req,res, next){
    verifyJwtToken(req.headers['x-auth-token']).then((data)=>{
        if(data.role === "SuperAdmin"){
            next();
        } else {
            res.send({"error":"denied"});
        }
    })
}
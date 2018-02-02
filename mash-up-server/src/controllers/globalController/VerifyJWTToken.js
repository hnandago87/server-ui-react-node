
import jwt from  'jsonwebtoken';
import {JWTSecret} from '../../globals/DbConfig';

export function verifyJwtToken(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token,JWTSecret, (err, decodedToken)=>{
            if(err || !decodedToken){
                return reject(err);
            }
            return resolve(decodedToken)
        })
    })
}
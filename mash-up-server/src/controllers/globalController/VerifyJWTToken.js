import {map, findIndex, without,findWhere, each} from 'underscore'
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

export function findProject(projects, projectId,identifier){
    return projects.findIndex((project)=>{
        return project[identifier] == projectId;
    });
}

export function removeFromArray(members, name){
    return without(members, findWhere(member, {
        name: name
    }));
}
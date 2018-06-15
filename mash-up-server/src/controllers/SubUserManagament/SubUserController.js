import {User} from '../../models/UserManagementModels';
import { verifyJwtToken,findProject,removeFromArray } from '../globalController/VerifyJWTToken';
import {Organization} from '../../models/OrganizationModal';
import {Project} from '../../models/ProjectModel';
import{Member} from '../../Models/MemberModel';
import {map, findIndex, without,findWhere, each} from 'underscore'


//private methods
export function getProject(req,res,next){
    Project.getProject(req.params.projectId,req.params.organizationCode).then((data)=>{
        if(data.hasData){
            res.status(200).send(data);
        }else{
            res.status(404).send({"error":true,"message":"project not found","data":data});
        }
    }).catch((err)=>{
        console.log(err)
        res.status(404).send({"error":true,"message":"No data found"});
    });
}

function addProject(req, res,next){
    if(req.role == "SuperAdmin" || (req.role == "Admin" && req.organizationCode == req.query.organizationCode)){
        var project = new Project(req.body);
        project.save().then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.send({"error":true,"message":"Cannot process action."});
        })
    } else {
        res.status(403).send({"error":true,"message":"Cannot process action."});
    }
    
}

//public methods
export function validateAdminRole(req,res, next){
    verifyJwtToken(req.headers['x-auth-token']).then((data)=>{
        if(data.role === "SuperAdmin" || data.role === "Admin"){
            req.organizationCode = data.organizationCode;
            req.role = data.role;
            next();
        } else {
            res.status(403).send({"error":true, "message":"denied"});
        }
    })
}

export function getProjects(req, res, next){
    console.log("calling get projects")
    if(req.params.organizationCode != null &&  req.params.organizationCode != undefined){
        //Find project according to organization
        console.log(req.params.organizationCode);
        Organization.getProjects(req.params.organizationCode).then((data)=>{
            res.status(200).send(data);
        }).catch((error)=>{
            console.log(error)
            res.status(404).send({"error":true,"message":"No data found"});
        })
    } else{
        //Find projects using jwt decoded value
         Organization.getProjects(req.organizationCode).then((data)=>{
            res.status(200).send(data);
        }).catch((error)=>{
            res.status(404).send({"error":true,"message":"No data found"});
        })
    }
}

//Add new organization
export function addOrganization(req, res, next){
    if(req.role == "SuperAdmin"){
        console.log("starting to create new org.....")
        var organization = new Organization(req.body);
        console.log("model created new org.....")
        organization.saveOrganization().then((data)=>{
            res.send(data);
        }).catch((err)=>{
            console.log(err)
            res.status(404).send({"error":true,"message":"Save operation failed"});
        });
    } else{
        res.status(403).send({"error":true,"message":"Cannot process action."});
    }
}



//update or delete users, change user access level
// export function updateProject(req,res,next){
//     console.log(req.method);
//     switch(req.method.toString()){
//         case "GET":
//             getProject(req,res,next);
//             break;
//         case "DELETE":
//             if(req.query.project){
//                 Organization.update({"OrganizationCode":req.params.organizationCode},{
//                     $pull:{organizationProjects:{ projectId: req.params.projectId}}
//                 }).then((data)=>{
//                         res.send({"status":"deleted","data":req.params.projectId});
//                     }).catch((err)=>{
//                         console.log(err)
//                     })
//             } else{
//                 console.log("member delete")
//                 Organization.findOne({"OrganizationCode":req.params.organizationCode}).then((data)=>{
//                     data.organizationProjects[0]["members"]["deleted"] = true;
//                     data.update()
//                     .then((data)=>{
//                         res.send({"status":"deleted","data":req.params.projectId});
//                     }).catch((err)=>{
//                         console.log(err)
//                     })
//                 }).catch((err)=>{
//                     console.log(err);
//                     res.status(404).send({"error":true});
//                 })
//             }
//             break;
//         case "PUT":
//             Organization.findOne({"OrganizationCode":req.param.OrganizationCode}).then((data)=>{
//                 var projectIndex = findProject(data.organizationProjects,req.params.projectId,"projectId");
//                 console.log("project index"+projectIndex)
//                 var memberIndex = findProject(data.organizationProjects[projectIndex].members,req.query.name,"name");
//                 if(memberIndex >=0){
//                     data["organizationProjects"][projectIndex]["members"][memberIndex][role] = req.body.role;
//                     data["organizationProjects"][projectIndex]["members"][memberIndex][permission] = req.body.permission;
//                     data.save().then((success)=>{
//                             res.send({"status":"deleted"});
//                         }).catch((err)=>{
//                             console.log(err);
//                             res.status(404).send({"error":true});
//                         });
//                 } else{
//                     data["organizationProjects"][projectIndex].members.push(new Member(Object.assign({},req.body))).save().then((success)=>{
//                             res.send({"status":"deleted"});
//                         }).catch((err)=>{
//                             console.log(err);
//                             res.status(404).send({"error":true});
//                         });
//                 }
//             }).catch((err)=>{
//                 console.log(err);
//                 res.status(404).send({"error":true});
//             })
//             break;
//         default:
//             res.status(404).send({"error":true,"message":"operation not supported"});
//     }
// }
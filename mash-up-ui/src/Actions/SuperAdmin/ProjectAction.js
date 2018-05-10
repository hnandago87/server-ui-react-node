import {GET_PROJECTS,CREATE_PROJECT, REMOVE_PROJECT,EDIT_PROJECT, ERROR_GET,ERROR_POST, ERROR_PUT} from 'SuperAdminActionCreators'

export function getAllProjects(){
    console.log("get all project action called")
    return (dispatch)=>{
        getProjectsAPI().then((response)=>{
            console.log(response)
            dispatch(success(response))
        })
    }

    function success(response){
        return{
            type:GET_PROJECTS,
            data:response
        }
    }
    function failure(error){
        return{
            type:ERROR_GET,
            data:error
        }
    }
}

export function configureProject(project){
    console.log("create project action called")
    return (dispatch)=>{
        createProject(project).then((response)=>{
            console.log(response)
            dispatch(success(response))
        })
    }

    function success(response){
        return{
            type:CREATE_PROJECT,
            data:response
        }
    }
    function failure(error){
        return{
            type:ERROR_GET,
            data:error
        }
    }
}
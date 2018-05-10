import {GET_PROJECTS,CREATE_PROJECT, REMOVE_PROJECT,EDIT_PROJECT, ERROR_GET,ERROR_POST, ERROR_PUT} from 'SuperAdminActionCreators'
const initialState = {};

export function projectsControl(state=initialState, action){
    switch(action.type){
        case GET_PROJECTS:
            console.log("get projects reducer called")
            console.log(action.data);
            return {};
        case CREATE_PROJECT:
            return {};
        case REMOVE_PROJECT:
            return {};
        case EDIT_PROJECT:
            return {};
        case ERROR_GET:
            return {};
        case ERROR_POST:
            return {};
        case ERROR_PUT:
            return {};
        default:
            return state;
    }
}
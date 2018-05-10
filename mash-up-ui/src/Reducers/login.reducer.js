import {SUCCESS_LOGIN,FAILURE_LOGIN, LOGOUT, FAILURE_LOGOUT} from '../Actions/LoginActions';

const initialState = localStorage.getItem('authenticated')?{"authenticated":localStorage.getItem('authenticated'), "email":localStorage.getItem('user'), "loggedIn":true,"loggedOut":false}:{"loggedIn":false,"loggedOut":true,"authenticated":false};

export function login(state=initialState, action){
    switch(action.type){
        case SUCCESS_LOGIN:
            console.log(state);
            console.log(action);
            return {
                ...state,
                loggedIn:action.user.loggedIn,
                authenticated:true,
                email:action.user.email,
                role:action.user.role
            };
        case FAILURE_LOGIN:
            return {
                ...state,
                authenticated:action.error.authenticated,
                loggedIn:action.error.loggedIn,
                loggedOut:action.error.loggedOut
            };
        case LOGOUT:
            console.log(action)
            return {
                ...state,
                loggedIn:action.data.loggedIn,
                loggedOut:action.data.loggedOut,
                authenticated:action.data.authenticated
            };
        case FAILURE_LOGOUT:
            return{
                ...state,
                loggedOut:action.error.loggedOut,
                authenticated:action.error.authenticated,
                loggedIn:action.error.loggedIn
            }
        default:
            return state;
    }
}
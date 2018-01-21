import {SUCCESS_LOGIN,FAILURE_LOGIN, LOGOUT} from '../Actions/LoginActions';

const initialState = localStorage.getItem('authenticated')?{"authenticated":localStorage.getItem('authenticated'), "email":localStorage.getItem('user'), "loggedIn":true}:{loggedIn:false};

export function login(state=initialState, action){
    switch(action.type){
        case SUCCESS_LOGIN:
            return {
                ...state,
                loggedIn:action.user.loggedIn,
                authenticated:true,
                email:action.user.email,
                role:action.user.role
            };
        case FAILURE_LOGIN:
            return {};
        case LOGOUT:
            console.log(action)
            return {
                loggedIn:false
            };
        default:
            return state;
    }
}
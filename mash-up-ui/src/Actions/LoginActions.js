import {sendLoginToAPI} from '../API/API';
export const SUCCESS_LOGIN='SEND_LOGIN'
export const FAILURE_LOGIN='FAILURE_LOGIN'
export const LOGOUT='LOGOUT'

export function getLogin(login){
    return (dispatch)=>{
        sendLoginToAPI(login)
            .then(user=>{
                dispatch(success(user));
            })
            .catch(error=>{
                dispatch(failure(error))
            })
    }

    function success(user){
        return {
            type:SUCCESS_LOGIN,
            user
        }
    }
    function failure(error){
        return {
            type:FAILURE_LOGIN,
            error
        }
    }
}

export function logOut(){
    localStorage.removeItem('authenticated');
    localStorage.removeItem('user');
    return (dispatch)=>{
        dispatch(success({loggedIn:false}))
    }
    function success(data){
        return {
            type:LOGOUT,
            data
        }
    }
}


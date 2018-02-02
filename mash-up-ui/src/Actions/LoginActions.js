import {sendLoginToAPI,sendLogoutToAPI} from '../API/API';
export const SUCCESS_LOGIN='SEND_LOGIN'
export const FAILURE_LOGIN='FAILURE_LOGIN'
export const FAILURE_LOGOUT='FAILURE_LOGOUT'
export const LOGOUT='LOGOUT'

export function getLogin(login){
    return (dispatch)=>{
        sendLoginToAPI(login)
            .then(user=>{
                dispatch(success(user));
            })
            .catch(error=>{
                dispatch(failure({loggedIn:false}))
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

export function logOut(data){
    return (dispatch)=>{
        sendLogoutToAPI(data.email).then(()=>{
            console.log("successfull logout")
            localStorage.removeItem('authenticated');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            dispatch(success({loggedIn:false,loggedOut:true,authenticated:false}))
        })
        .catch((err)=>{
            console.log("error in logout")
            dispatch(failure({loggedOut:false,authenticated:false,loggedIn:false}))
        }) 
    }
    function success(data){
        return {
            type:LOGOUT,
            data
        }
    }
    function failure(error){
        return {
            type:FAILURE_LOGOUT,
            error
        }
    }
}


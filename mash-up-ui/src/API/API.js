import {config} from './globals'
export function sendLoginToAPI(data){
    return fetch(config.hostname+"usersLogin/login",{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST", 
        body: JSON.stringify(data)
    })
    .then((response)=>{
        console.log(response.ok) 
        if(!response.ok){
            return Promise.reject("failed to login")
        }
        return response.json();
    })
    .then(response=>{
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('user', response.email);
        return response
    })
}
export function sendLogoutToAPI(){
    return fetch(config.hostname+"userLogin/logout",{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('token')
        },
        method:"GET"
    }).then((response)=>{
        if(!response.ok){
            return Promise.reject("logout not successfull!!");
        }
        return response.json();
    })
}
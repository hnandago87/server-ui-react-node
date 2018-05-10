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
export function sendLogoutToAPI(email){
    return fetch(config.hostname+"usersLogin/logout",{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify({"token":localStorage.getItem("token"),"email":email})
    }).then((response)=>{
        if(!response.ok){
            return Promise.reject("logout not successfull!!");
        }
        return response.json();
    })
}
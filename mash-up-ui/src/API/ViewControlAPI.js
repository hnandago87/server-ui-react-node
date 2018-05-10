import {config} from './globals';

export function getViewControl(page){
    console.log("View API called")
    console.log(page)
    return fetch(config.hostname+'page/access/'+page,{
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth-token':localStorage.getItem("token")
        },
        method: "GET"
    }).then((response)=>{
        console.log("response view")
       if(!response.ok){
            return Promise.reject("failed to login")
        }
        
        return response.json();
    })
}
export function sendLoginToAPI(data){
    console.log(data)
    return fetch("http://localhost:5000/usersLogin/login",{
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
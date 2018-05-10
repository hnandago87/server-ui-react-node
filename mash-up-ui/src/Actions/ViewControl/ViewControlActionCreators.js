import {GET_VIEW,TOGGLE_VIEW,RESET_VIEW,ERROR_GET} from './ViewContolActions'
import {getViewControl} from '../../API/ViewControlAPI'

export function addingView(page){
    console.log("view action called")
    return (dispatch)=>{
        getViewControl(page).then((response)=>{
            console.log(response)
            dispatch(success(response))
        })
    }

    function success(response){
        return{
            type:GET_VIEW,
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

export function changeView(pageName,currentView){
    return (dispatch)=>{dispatch(success(pageName,currentView))}

    function success(pageName, currentView){
        return{
            type: TOGGLE_VIEW,
            data:{pageName,currentView}
        }
    }
}
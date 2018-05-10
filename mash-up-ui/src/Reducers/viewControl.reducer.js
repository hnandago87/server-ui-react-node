import {GET_VIEW,TOGGLE_VIEW,RESET_VIEW,ERROR_GET} from '../Actions/ViewControl/ViewContolActions';

const initialState={}

export function viewControl(state=initialState, action){
    switch(action.type){
        case GET_VIEW:
            console.log("view reducer called")
            console.log(action);
            return{
                ...state,
                [action.data.pageName]:{
                    defaultView:action.data.access.defaultView,
                    switchable:action.data.access.switchable,
                    switched:false,
                    accessAllowed:action.data.access.switchablePages,
                    currentView:action.data.access.defaultView
                }
            }
        case ERROR_GET:
            return{
                ...state
            }
        case TOGGLE_VIEW:
            return{
                ...state,
                [action.data.pageName]:{
                    ...state[action.data.pageName],
                    switched:action.data.switched,
                    currentView:action.data.currentView
                }
            }
        case RESET_VIEW:
            return{
                ...state,
                [action.data.pageName]:{
                    ...state[action.data.pageName],
                    currentView:action.data.currentView,
                    switched:action.data.switched
                }
            }
        default:
            return state;
    }
}
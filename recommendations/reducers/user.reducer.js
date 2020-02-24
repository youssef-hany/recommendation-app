import { combineReducers } from 'redux';


const getUser = (state = {}, action) =>{
    switch(action.type){
        case "GET_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                userData: null,
                errors: null
            }
        case "GET_USER_SUCCESS":

            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                userData: action.payload,
                errors: null

            }
            
        case "GET_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                userData: null,
                errors: null

            }
        default:
            return state;

    }
}

export default combineReducers({
    getUser
})
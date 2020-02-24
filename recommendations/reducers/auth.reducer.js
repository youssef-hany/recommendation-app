import { combineReducers } from 'redux';

const authData = (state = {}, action) =>{
   switch(action.type){
        case "AUTH_USER_SUCCESS":
            return{
                token: action.token,
                isLoggedIn: true
            }
        
        case "AUTH_USER_FAIL":
        case "CREATE_USER_FAIL":
        case "LOGIN_USER_FAIL":
            return{
                token: null,
                isLoggedIn: false
            }
        default:
            return state
        

   }

}


const createUser = (state = {}, action) =>{
    switch (action.type){
        case "CREATE_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null,
            }

        case "CREATE_USER_SUCCESS":
            return {
                isLoading: true,
                isError: false,
                isSuccess: true,
                errors: null,
            }

        case "CREATE_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload,
            }
        case "USER_LOG_OUT_LOADING":
            return {
                isLoading: true,
                token: null,
                isError: false,
                isSuccess: false,
                errors: null,
                isLoggedIn: false
            }

        default:
            return state

    }
    
}


const loginUser = (state = {}, action) =>{
    switch (action.type){
        case "LOGIN_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null,
            }

        case "LOGIN_USER_SUCCESS":
            return {
                isLoading: true,
                isError: false,
                isSuccess: true,
                errors: null,
            }

        case "LOGIN_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload,
            }

        default:
            return state

    }
    
}

export default combineReducers({
    createUser,
    loginUser,
    authData
})
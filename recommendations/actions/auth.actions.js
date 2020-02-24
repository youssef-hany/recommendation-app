import {register, login, logout, loginCheck, userUpdatePost} from '../tools/postService';
import HttpService from '../tools/getService';
const http = new HttpService()


export const createNewUser = (payload) => {
    return async (dispatch) =>{
        try{

            dispatch({type: "CREATE_USER_LOADING"});
            const response =  await register(payload)
            if(response.success){
                dispatch({
                    type:"CREATE_USER_SUCCESS",
                });
                dispatch({
                    type:"AUTH_USER_SUCCESS",
                    token: response.token
                });
                dispatch({
                    type:"GET_USER_SUCCESS",
                    payload: response.userData
                });
                console.log(response.userData)
                return response;
            }else{
                dispatch({
                    type:"CREATE_USER_FAIL",
                    payload: response.resBody
                })
                throw response
            }

        } catch(error) {
            dispatch({
                type:"CREATE_USER_FAIL",
                payload: error.resBody
            })
            return error;

        }
        
    }
}

export const updateUser = (payload) =>{
    return async (dispatch) =>{
        try {
            const response = await userUpdatePost(payload);
            if(response.success){
                dispatch({
                    type:"GET_USER_SUCCESS",
                    payload: response.userData
                });
                return response
            }else{
                dispatch({
                    type:"GET_USER_FAIL",
                })
                throw response
            }


        }catch(error) {
            dispatch({
                type:"GET_USER_FAIL",
            })
            return error

        }
    }
}

export const changeProfile = (payload) =>{
    return async (dispatch) =>{
            try{

                const response = await http.postImage(payload)
                if(response.success){
                    dispatch({
                        type:"GET_USER_SUCCESS",
                        payload: response.userData
                    });
                    return response
                }else{
                    dispatch({
                        type:"GET_USER_FAIL",
                    })
                    throw response
                }
            } catch(error) {
                dispatch({
                    type:"GET_USER_FAIL",
                })
                return error
    
            }
}
}
export const addpostImg = (payload) =>{
    return async (dispatch) =>{
            try{

                const response = await http.addPost(payload)
                if(response.success){
                    dispatch({
                        type:"GET_USER_SUCCESS",
                        payload: response.userData
                    });
                    return response
                }else{
                    dispatch({
                        type:"GET_USER_FAIL",
                    })
                    throw response
                }
            } catch(error) {
                dispatch({
                    type:"GET_USER_FAIL",
                })
                return error
    
            }
}
}
export const loginUser = (payload) => {
    return async (dispatch) =>{
        try{

            dispatch({
                type: "LOGIN_USER_LOADING"
            });
            const response =  await login(payload)
            if(response.success){
                dispatch({
                    type:"LOGIN_USER_SUCCESS",
                });
                dispatch({
                    type:"AUTH_USER_SUCCESS",
                    token: response.token
                });
                dispatch({
                    type:"GET_USER_SUCCESS",
                    payload: response.userData
                });
                return response
            }else{
                dispatch({
                    type:"LOGIN_USER_FAIL",
                    payload: response.error
                })
                throw response
            }
        } catch(error) {
            dispatch({
                type:"LOGIN_USER_FAIL",
                payload: error
            })
            return error

        }
        
    }
}

export const loginChecker = (payload) => {
    return async (dispatch) =>{
        try{

            dispatch({
                type: "LOGIN_USER_LOADING"
            });
            const response =  await loginCheck(payload)
            if(response.success){
                dispatch({
                    type:"LOGIN_USER_SUCCESS",
                });
                dispatch({
                    type:"GET_USER_SUCCESS",
                    payload: response.userData
                });
                return response
            }else{
                dispatch({
                    type:"LOGIN_USER_FAIL",
                    payload: response.error
                })
                throw response
            }
        } catch(error) {
            dispatch({
                type:"LOGIN_USER_FAIL",
                payload: error
            })
            return error

        }
        
    }
}

export const logoutUser = () =>{
    return async (dispatch, getState) =>{
        const state = getState();
        try {
            const {authReducer: {authData: {token : token}}} = state;
            dispatch({
                type:"USER_LOG_OUT_LOADING"
            })
            var response =  await logout(token);        
        if(response.success){
                dispatch({
                    type:"USER_LOG_OUT_SUCCESS",
            })
            
            return response.resBody
        }else{
            throw response
        }
                
           
           
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
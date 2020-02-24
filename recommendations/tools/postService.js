import axios from'axios';
import FormData from 'form-data'

const instance = axios.create({
    timeout: 5000,
  });
const BASE_URL = 'http://172.20.10.4:3001';

export const register = (newUser) =>{
    return instance.post(BASE_URL + '/users/register', {
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password
    }).then(response =>{
      return response.data
    })

}

export const login = (user) =>{
    return instance.post(BASE_URL + '/users/login', {
        email: user.email,
        password: user.password
    }).then(response =>{
        return response.data
    }).catch(err =>{
        console.log({error: 'could not post login ' + err})
        return err
        
    })

}
export const userUpdatePost = (user) =>{
    return instance.post(BASE_URL + '/users/profile/userUpdate', {
        email: user.email,
        _id: user._id
    }).then(response =>{
        return response.data
    }).catch(err =>{
        console.log({error: 'could not Update User ' + err})
        return err
        
    })
}
export const loginCheck = (user) =>{
    return instance.post(BASE_URL + '/users/loginCheck', {
        email: user.email,
        password: user.password
    }).then(response =>{
        return response.data
    }).catch(err =>{
        console.log({error: 'could not post login ' + err})
        return err
        
    })

}
export const logout = (token) => {
    return instance.post(BASE_URL + '/users/logout', {
        token: token
    }).then(response => {
        return response.data
    }).catch(err => {
        console.log({error: 'could not logout ' + err})
    })
}

export const getUserById = (id) =>{
    var data = {
        _id: id
    }
    return instance.post(BASE_URL + '/users/getuser/byid', data, {
    }).then(response =>{
        return response.data
    }).catch(err =>{
       console.log(err)
        return err
    })
}

export const getPosts = (id) => {
    var data = {
        _id: id
    }
    return instance.post(BASE_URL + '/posts/getallposts', data, {
    }).then(response =>{
        return response.data
    }).catch(err =>{
       console.log(err)
        return err
    })
    
}

export const getPostsById = (id) =>{
    var data ={
        _id: id
    }
    return instance.post (BASE_URL + '/posts/getposts/byid', data, {
    }).then(response =>{
        return response.data
    }).catch(err =>{
        console.log(err)
        return err
    })
}


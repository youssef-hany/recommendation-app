import 'whatwg-fetch';
import FormData from 'form-data';
const BASE_URL = 'http://172.20.10.4:3001';

class HttpService {
    postImage =  (data) => {
        console.log('posting..')
        var formData = new FormData();  
        formData.append('email', data.email)
        formData.append('_id', data._id)
        formData.append('token', data.token)
        formData.append('file',{
            uri: data.file.uri,
            type:'image/jpeg',
            name: data.email + 'ProfileImg'
        })
        
            
        return fetch(BASE_URL + '/users/profile/imageUpdate', {  
                headers: {
                    'Accept': 'application/json',
                    'authorization': data.token
                },
                method: 'PUT',
                body: formData
              }).then(response => response.json()).then(response =>{
                  return response
              }).catch(err =>{
                console.log({error: 'could not post Image ' + err})
                return err
                
            })
                 
    }

    addPost = (data) =>{
        var formData = new FormData();
        formData.append('email', data.email)
        formData.append('profileImg', data.profileImg)
        formData.append('name', data.name)
        formData.append('userId', data._id)
        formData.append('title', data.title)
        formData.append('tags', data.tags)
        formData.append('file',{
            uri: data.file.uri,
            type:'image/jpeg',
            name: data.email + 'postImg'
        })
        return fetch(BASE_URL + '/posts/addpost', {
            headers: {
                'Accept': 'application/json',
            }, 
            method: 'POST',
            body: formData
        }).then(response => response.json()).then(response =>{
            return response
        }).catch(err =>{
          console.log({error: 'could not add post' + err})
          return err
          
      })

    }

    getPosts = (id) =>{
        var data = {
            _id: id
        }
        return fetch(BASE_URL + '/posts/getallposts', {
            method: 'POST',
            body: data
        }).then (response => response).then(response =>{
            return response
        }).catch(err =>{
            console.log({error: 'could not get post' + err})
            return err
        })
    }
}
export default HttpService;
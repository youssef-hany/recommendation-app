const express = require('express');
const cors = require('cors');
const posts = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (request, file, callback){
        callback(null, './uploads/posts')
    },
    filename:  function (request, file, callback){
        var type = file.mimetype.split("/");
        var ext = type[1]
        callback(null, Date.now() + file.originalname + '.' + ext); 
        

    }
})
const fileFilter = (req, file, callback) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        callback(null, true)
    }else{
        callback(null, false)
    }
}
const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Posts = require('../models/posts');
const User = require('../models/user');

posts.use(cors());

process.env.SECRET_KEY = 'secret';


posts.post('/addpost',upload.single('file'), function(request, response){
    const postData = {
        email: request.body.email,
        name: request.body.name,
        profileImg: request.body.profileImg,   
        userId:  request.body.userId,
        title: request.body.title,
        postImg: request.file.path,
        tags: request.body.tags
    }
    result = {
        success: false,
        postData: {},
        posts: {}

    }
    User.findOne({
        '_id': postData.userId
    }).then(user =>{
        if(user){
            Posts.create(postData).then(newPost => {
                if(newPost){
                    
                    Posts.find({'userId': request.body.userId}).then(posts =>{
                        result.success = true 
                        result.postData = newPost
                        result.posts = posts
                        return response.send(result)
                    })

                }else{
                    return response.send("failed to return new post checkdb")
                }
               
            }).catch(err =>{
                console.log(err)
                return response.send('error in create' + err)
            })
        }else{
           return response.send("user not found")
        }
    }).catch(err =>{
        return response.send('error in findone' + err)
    })


});

posts.post('/getposts/byid', function(request, response){
    Posts.find({'userId': request.body._id}).then(posts =>{
        return response.send(posts)
    }).catch(err =>{
        return response.send('error in get user profile posts' + err)
    }) 
})

posts.post('/getallposts', function (request, response) {
    result = {
        success: false,
        posts: {},
        users: {}
    }

    User.findOne({
        '_id': request.body._id
    }).then(user =>{

        if(user){
            Posts.find({}).then(posts =>{
                if(posts){
                    result.success = true
                    result.posts = posts
                    return response.json(result)
                }else{
                    return response.send('nothing to show')
                }
            })
        }else{
            return response.send("user not found")
        }

    }).catch(err =>{
        return response.send('error in findone' + err)
    })
    
});




module.exports = posts
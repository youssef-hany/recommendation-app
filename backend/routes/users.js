const express = require('express');
const cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const ObjectId = require('mongodb').ObjectID
var ftype = '';
var ext = '';
const storage = multer.diskStorage({
    destination: function (request, file, callback){
        callback(null, './uploads/profile')
    },
    filename:  function (request, file, callback){
        var type = file.mimetype.split("/");
        var ext = type[1]
        callback(null, + '*' +  Date.now() + file.originalname + '.' + ext);

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

users.use(cors());

process.env.SECRET_KEY = 'secret';


users.post('/register', upload.single('profileImg'), function(request, response){
    const today = Date.now()
    console.log(request.file)
    const userData = {
        profileImg: request.file ? request.file.path : '',
        name: request.body.name,
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password,
        posts: [],
        dateOfRegister: today
    }
    const result = {
        token: null,
        success: false,
        resBody: null,
        userData: {}
    }

    User.findOne({
        'email': request.body.email
    }).then(user => {
        if(!user){
            bcrypt.hash(request.body.password, 10, (err, hash) =>{
                userData.password = hash
                User.create(userData).then(user =>{
                    userData._id = user._id;
                    let token = jwt.sign(userData, process.env.SECRET_KEY)
                    result.success = true;
                    result.resBody = {status: user.email + ' Registered'};
                    result.userData = user
                    result.token = token;
                    response.send(result);
                }).catch(err =>{
                    result.success = false;
                    result.resBody = {error: 'could not create user' + err}
                    result.token = false;
                    response.send(result);
                })

            })

        }else{
            result.success = false;
            result.resBody = {error: "User already exists"};
            result.token = false;
            response.send(result);
        }
    }).catch(err => {
        result.success = false;
        result.resBody = {error: 'Problem in findOne function' + err};
        result.token = false;
        response.send(result);
    })
});

users.post('/login', function(request, response){
    var result = {
        userData: {},
        token: null,
        success: false,
        resBody: null
    }

    User.findOne({
        'email': request.body.email
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(request.body.password, user.password)){
                const payload = {
                    _id: user._id,
                    name: user.name,
                    userName: user.userName,
                    email: user.email,
                    password: user.password,
                    timestamp: Date.now()
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY)
                result.token = token
                result.userData = user
                result.resBody = {status: user.email + ' has logged in'}
                result.success = true
                Posts.find({'userId': user._id}).then(posts =>{
                    result.userData.posts = posts
                    response.send(result)
                })  
            }else{
                result.resBody = {error: "Incorrect Login Credentials"}
                result.token = null
                result.success = false
                response.send(result)
            }
        }else{
            result.resBody = {error: "User does not exist"}
            result.token = null
            result.success = false
            response.send(result)
        }
    }).catch(err => {
        result.resBody = {error: 'problem in findOne function' + err}
        result.token = null
        result.success = false
        response.send(result)
       
    })

});
users.post('/loginCheck', function(request, response){
    var result = {
        userData: {},
        token: null,
        success: false,
        resBody: null
    }
    console.log(request.body)

    User.findOne({
        'email': request.body.email
    }).then(user => {
        if(user){
                if(request.body.password === user.password){
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        userName: user.userName,
                        email: user.email,
                        password: user.password,
                        timestamp: Date.now()
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY)
                    result.token = token
                    result.userData = user
                    result.resBody = {status: user.email + ' has gone to profile in'}
                    result.success = true
                    Posts.find({'userId': user._id}).then(posts =>{
                        result.userData.posts = posts
                        console.log('at posts: '+ result.userData)
                        response.send(result)
                    })  
                    
                }else{
                    result.resBody = {error: "Incorrect Login Credentials"}
                    result.token = null
                    result.success = false
                    response.send(result)
                }
           
            
            
        }else{
            result.resBody = {error: "User does not exist"}
            result.token = null
            result.success = false
            response.send(result)
        }
    }).catch(err => {
        result.resBody = {error: 'problem in findOne function' + err}
        result.token = null
        result.success = false
        response.send(result)
       
    })

});

users.get('/profile', (request, response) =>{
	var decoded = jwt.verify(request.headers['authorization'], process.env.SECRET_KEY);
	User.findOne({
		'_id': decoded._id
	}).then(user => {
		if(user){
			response.json(user);
		} else{
			response.send('User does not exist')
		}
	}).catch(err =>{
		response.send('error: ' + err)
		
	})
	
});
users.post('/logout', (request, response) =>{
    var result = {
        resBody: null,
        userData: {},
        token: null,
        success: false,
    }
    var decoded = jwt.verify(request.body.token, process.env.SECRET_KEY);
    User.findOne({
		'_id': decoded._id
	}).then(user => {
        if(user){
            result.userData = user
            result.resBody = user.email + ' Has Logged out'
            result.success = true;
            response.send(result);
       }else{
           result.success = true;
           response.send(result)
       }
    })
});


users.post('/profile/userUpdate', (request, response) =>{
    var decoded = true
    if(decoded){
        
        var userData = {
            _id: request.body._id,
            email: request.body.email,
           
        }
        var result = {
            success: false,
            userData: {}
        }  
    }else{
        console.log({error: "Someone is trying to Update Profile with false token"})
        response.json({error: "Someone is trying to Update Profile with false token"})
    }

    User.findOne({
        '_id': new ObjectId(userData._id)
    }).then(user =>{

        if(user){

            result.success = true
            result.userData = user
            Posts.find({'userId': new ObjectId(user._id)}).then(posts =>{
                result.userData.posts = posts
                response.send(result);
            })     
        }else{
            response.send("user not found")
        }
    }).catch(err =>{
        response.send(err)
    })

})

users.put('/profile/imageUpdate', upload.single('file'),(request, response) => {
    var decoded = true
    var file = request.file
    if(decoded){
        
        var userData = {
            _id: request.body._id,
            email: request.body.email,
           
        }
        var result = {
            success: false,
            userData: {}
        }  
        var conditions = {_id: userData._id}
        var profileImg = request.file.path
        console.log(request.body._id)
    }else{
        console.log({error: "Someone is trying to change profile picture with false token"})
        response.json({error: "Someone is trying to change profile picture with false token"})
    }
    User.findOne({
        'email': userData.email
    }).then(user =>{
        if(user){
            User.updateOne({'_id': userData._id}, {'profileImg': profileImg}).then(res =>{
                if(res){
                    result.success = true
                    result.userData = user
                    result.userData.token = request.body.token
                    result.userData.profileImg = profileImg
                    Posts.find({'userId': user._id}).then(posts =>{
                        result.userData.posts = posts
                        console.log(result)
                        return response.status(200).send(result);
                    })  
                }else{
                    return response.status(404).end()
                }
            }).catch(err =>{
                response.send(err)
            })
        }else{
            response.send("user not found")
        }
    }).catch(err =>{
        response.send(err)
    })
});

users.post('/getuser/byid', (request, response) => {
    result = {
        success: false,
        userData: {}
    }
    User.findOne({
        '_id': request.body._id
    }).then(user =>{
        if(user){
            result.success = true
            result.userData = user
            return response.send(result)
            
        }else{
            return response.send("No User")
        }
    }).catch(err =>{
        return response.send(err)
    })
})


module.exports = users
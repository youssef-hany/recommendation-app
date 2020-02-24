var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var posts = new Schema({
    userId:  ObjectId,
    email: String,
    name: String,
    profileImg: String,
    title: String,
    postImg: String,
    tags: String,
    date: {type: Date, default: Date.now()} 

   

})

module.exports = mongoose.model('Post', posts)
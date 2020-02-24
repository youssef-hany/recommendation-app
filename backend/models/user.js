var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var user = new Schema({
    profileImg:  String,
    name: String,
    userName: String,
    email: String,
    password: String,
    tags: String,
    posts: { type: Array , default: [] },
    dateOfRegister: {type: Date, default: Date.now()} 

})

module.exports = mongoose.model('User', user)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name  : {
        type:String
    },
    email : {
        type:String
    },
    phone : {
        type:String
    },
    password: {
        type:String
    },
    usertype :{
        type:Number,
        default:3
    },
    userRole :{
        type:String,
        default: 'user'
    }
    
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema,'Users');
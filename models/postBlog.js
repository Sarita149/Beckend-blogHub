const mongoose = require('mongoose');

const postBlog = new mongoose.Schema({
    title: {type:String},
    heading : { type: String},
    content : { type: String}
    // img: {type:string},
})

module.exports = mongoose.model("postBlog",postBlog);
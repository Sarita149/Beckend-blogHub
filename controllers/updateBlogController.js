const Blog = require('../models/postBlog');

const UpdateBlog = (req,res)=>{
    let updateBlog = {
        title:req.body.title,
        heading:req.body.heading,
        content:req.body.content
    }
    Blog.findByIdAndUpdate(req.params.id,{$set:updateBlog},{new : true},(err,doc)=>{
        console.log(req.params);
        if(err){
            return res.send(err);
        }else{
            return res.json(doc);
        }
    });
};

module.exports = UpdateBlog;
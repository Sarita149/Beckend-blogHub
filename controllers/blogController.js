const Blog = require('../models/postBlog');

const getBlogById = (req,res)=>{
    Blog.findById(req.params.id,(err,data)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json(data);
        }
    });
};

module.exports = getBlogById;
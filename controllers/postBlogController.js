const Blog = require('../models/postBlog');

const postBlog = (req,res)=>{
    // let body = req.body;
    // console.log(req);
    // console.log(body);

    const addBlog = new Blog({
        title:req.body.title,
        heading:req.body.heading,
        content:req.body.content
    });
    console.log(addBlog);

    addBlog .save().then(
        (doc)=>{
            res.json({
                message: 'Post Succesfully',
                result : doc
            });
        }
    ).catch((err)=>{
        res.json(err)
    })
}



module.exports = postBlog;

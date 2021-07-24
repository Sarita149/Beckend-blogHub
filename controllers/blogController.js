const Blog = require('../models/postBlog');
const category = require('../models/Category');

const getBlogById = (req, res) => {
    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json(data);
        }
    });
};

const allblogs = (req, res) => {
    Blog.find((err, data) => {
        if (err) {
            return res.send(err);
        } else {
            const returnData = data.map((item) => {
                let SingleBlog = item.toJSON();
                // console.log("this is singleBlog item : "+SingleBlog);
                SingleBlog.Link = {};
                // console.log(SingleBlog);
                SingleBlog.Link.href = `http://${req.headers.host}/api/allblogs/${item._id}`;
                // console.log(SingleBlog);
                return SingleBlog;
            });
            // console.log(returnData);
            return res.json(returnData);
        }
    });
};

const postBlog = async (req, res) => {

    let cat = await category.findOne({ categoryName: req.body.category }).lean();

    if (!cat) {
        let catObj = { categoryName: req.body.category };
        cat = await new category(catObj).save();
    }

    const addBlog = new Blog({
        author: req.decodedToken._id,
        title: req.body.title,
        timage: req.body.timage,
        content: req.body.description,
        category: cat._id,
    });
    // console.log(addBlog);

    addBlog.save().then(
        (doc) => {
            return res.json({
                message: 'Post Succesfully',
                result: doc
            });
        }
    ).catch((err) => {
        return res.json(err)
    })
    // }
    // else{
    //     return res.json({
    //         message:'invalid AuthorID...'
    //     })
    // }
}

const UpdateBlog = (req, res) => {
    let updateBlog = {
        title: req.body.title,
        heading: req.body.heading,
        content: req.body.content
    }
    Blog.findByIdAndUpdate(req.params.id, { $set: updateBlog }, { new: true }, (err, doc) => {
        console.log(req.params);
        if (err) {
            return res.send(err);
        } else {
            return res.json(doc);
        }
    });
};


const AllHomedata = async (req, res) => {
    let count = await Blog.countDocuments();
    let blogsData = await Blog.find().select('title timage content category views shortDescription createdAt updatedAt').lean();

    if (!blogsData) {
        return res.json({ success: false, message: "Unable to fetch data." });
    }

    return res.json({ success: true, data: blogsData, count });

}

module.exports = { getBlogById, allblogs, postBlog, UpdateBlog, AllHomedata };
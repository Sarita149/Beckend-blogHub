const Blog = require('../models/postBlog');
const category = require('../models/Category');



const allblogs = async(req, res) => {
    let query = {};
    if (req.body.search) {
        query = { title: new RegExp(req.body.search, 'i') };
    }

    if (req.body.category) {
        // query['$match '] = [{ author: "dave" }];
        query['category'] = req.body.category;
    }

    let count = await Blog.countDocuments(query);
    let blogsData = await Blog.find(query).sort({ views: -1, createdAt: -1 })
        .skip((req.body.pageNo - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
        .select('title timage category views shortDescription createdAt updatedAt')
        .populate({ path: 'author', select: ['username'] })
        .populate({ path: 'category', select: ['categoryName'] })
        .lean();

    if (!blogsData) {
        return res.json({ success: false, message: "Unable to fetch data." });
    }

    return res.json({ success: true, data: blogsData, count });
};

const postBlog = async(req, res) => {
    // let cat = await category.findOne({ categoryName: req.body.category }).lean();

    // if (!cat) {
    //     let catObj = { categoryName: req.body.category };
    //     cat = await new category(catObj).save();
    // }

    const addBlog = new Blog({
        author: req.decodedToken._id,
        title: req.body.title,
        timage: req.body.timage,
        content: req.body.description,
        category: req.body.category,
        views: req.body.views,
        shortDescription: req.body.shortDescription,
        publish: false
    });

    addBlog.save().then(
        (doc) => {
            return res.json({
                message: 'Blog added Succesfully.',
                success: true,
            });
        }
    ).catch((err) => {
        return res.json({
            message: 'Something went wrong. Please contact technical team.',
            success: false,
        })
    });
}

const UpdateBlog = (req, res) => {
    let updateBlog = {
        title: req.body.title,
        heading: req.body.heading,
        content: req.body.content
    }
    Blog.findByIdAndUpdate(req.params.id, { $set: updateBlog }, { new: true }, (err, doc) => {

        if (err) {
            return res.send({
                message: 'Blog updated Succesfully.',
                success: true,
            });
        } else {
            return res.json({
                message: 'Blog updation failed.',
                success: false,
            });
        }
    });
};

const deleteBlog = (req, res) => {

}

const getBlogById = async(req, res) => {
    console.log("req params :: ", req.params, );

    let blogData = await Blog.findById(req.params.id)
        .select('title timage content category views shortDescription createdAt updatedAt')
        .populate({ path: 'author', select: ['username', 'email'] })
        .populate({ path: 'category', select: ['categoryName'] })
        .lean();

    if (blogData) {
        return res.json({ success: true, blogData });
    } else {
        return res.json({ success: false, message: "Unable to fetch data." });
    }
}


const AllHomedata = async(req, res) => {
    // console.log(req.body);
    let count = await Blog.countDocuments();
    let blogsData = await Blog.find().sort({ views: -1, createdAt: -1 })
        .skip((req.body.pageNo - 1) * req.body.pageSize)
        .limit(req.body.pageSize)
        .select('title timage category views shortDescription createdAt updatedAt')
        .populate({ path: 'author', select: ['username'] })
        .populate({ path: 'category', select: ['categoryName'] })
        .lean();

    if (!blogsData) {
        return res.json({ success: false, message: "Unable to fetch data." });
    }

    return res.json({ success: true, data: blogsData, count });
}

module.exports = { getBlogById, allblogs, postBlog, UpdateBlog, AllHomedata, deleteBlog };
const Blog = require('../models/postBlog')

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

module.exports = allblogs;
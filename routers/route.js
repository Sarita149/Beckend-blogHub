const router = require('express').Router();

const postblog = require('../controllers/postBlogController');
const allBlogs = require('../controllers/allBlogsController');
const getBlogById = require('../controllers/blogController');
const UpdateBlog = require('../controllers/updateBlogController');

router.post('/addblog',postblog);
router.get("/allblogs", allBlogs);
router.get('/allblogs/:id',getBlogById)
router.post('/allblogs/:id',UpdateBlog);

module.exports = router;
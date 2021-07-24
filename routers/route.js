const router = require('express').Router();
const jwtAuth = require('../controllers/authController');
const { getBlogById, allblogs, postBlog, UpdateBlog, AllHomedata } = require('../controllers/blogController');

// const postblog = require('../controllers/postBlogController');
// const allBlogs = require('../controllers/allBlogsController');
// const UpdateBlog = require('../controllers/updateBlogController');
// const auth = require('../controllers/authController');

router.post('/addblog', jwtAuth, postBlog);
router.get("/allblogs", allblogs);

router.get('/allblogs/:id', getBlogById)
router.post('/allblogs/:id', UpdateBlog);


router.get("/allHomeData", AllHomedata);

module.exports = router;
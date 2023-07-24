const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const blogController = require('../controllers/blogController');

// Blog CRUD routes
router.post('/create', authMiddleware, blogController.createBlog);
router.get('/getBlogs', blogController.getBlogs);
router.get('/getBlog/:id', blogController.getBlogById);
router.put('/update/:id', authMiddleware, blogController.updateBlog);
router.delete('/delete/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;

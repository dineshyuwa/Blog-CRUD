const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { heading, body, postedDate, author } = req.body;
        console.log(req.body);
        const blog = new Blog({ heading, body, postedDate, author });
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create blog' });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        console.log(blogs);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch blogs' });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch blog' });
    }
};

const updateBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { heading, body, postedDate, author } = req.body;
        console.log(req.body);
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { heading, body, postedDate, author },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Could not update blog' });
    }
};

const deleteBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete blog' });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};

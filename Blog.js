const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    body: { type: String, required: true },
    postedDate: { type: Date, required: true },
    author: { type: String, required: true },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

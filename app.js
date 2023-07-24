const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const session = require('express-session');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: '1234test', // Replace with a secret key for session encryption
        resave: false,
        saveUninitialized: false,
    })
);

// Routes
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

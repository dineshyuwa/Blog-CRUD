const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture,
        });

        const newUser = await user.save();

        // Create and send a JWT token for authentication
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Could not register user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req);
        // Check if user with the given email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create and send a JWT token for authentication
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        console.log(token);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Could not log in user' });
    }
};

const checkLoggedInUser = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'User not logged in' });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error logging out:', err);
            res.status(500).json({ message: 'Error logging out' });
        } else {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ message: 'User logged out successfully' });
        }
    });
};


module.exports = {
    registerUser,
    loginUser,
    checkLoggedInUser,
    logoutUser
};

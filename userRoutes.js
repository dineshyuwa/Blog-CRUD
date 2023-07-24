const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Check if the user is logged in
router.get('/user', userController.checkLoggedInUser);

// User logout route
router.post('/logout', userController.logoutUser);

module.exports = router;

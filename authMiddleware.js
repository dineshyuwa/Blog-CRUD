const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Check if the header starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    // Extract the token value by removing 'Bearer ' prefix
    const token = authHeader.substring(7);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;


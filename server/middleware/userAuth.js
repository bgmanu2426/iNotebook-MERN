const jwt = require('jsonwebtoken');
require('dotenv').config();

const userauth = (req, res, next) => {
    //Get the users JWT token from header
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Please authenticate using valid token" })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using valid token" })
    }
}

module.exports = userauth;
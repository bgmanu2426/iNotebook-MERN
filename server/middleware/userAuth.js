const jwt = require('jsonwebtoken');
const config = require('../environment');

const userauth = (req, res, next) => {
    //Get the users JWT token from header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using valid token" })
    }
    
    try {
        const data = jwt.verify(token, config.jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using valid token" })
    }
}

module.exports = userauth;
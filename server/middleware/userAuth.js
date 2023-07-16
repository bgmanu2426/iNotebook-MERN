const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const userauth = (req, res, next) => {
    //Get the users JWT token from header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: "Please authenticate using valid token" })
    }
    
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Please authenticate using valid token" })
    }
}

module.exports = userauth;
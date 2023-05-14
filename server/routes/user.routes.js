const userController = require('../controllers/user.controller');
const { body, validationResult } = require('express-validator');

module.exports = (app) => {
    //Create a user using POST '/api/user/createuser'. Dosen't require authentication
    app.post('/api/user/createuser',
        body('email').isEmail().withMessage("Invalid Email"),
        body('name', "Name is invald or too short").isLength({ min: 4 }),
        body('password').isLength({ min: 6 }).withMessage("Password is too short")
        , userController.createuser);
}
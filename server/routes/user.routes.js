const userController = require('../controllers/user.controller');
const { body, validationResult } = require('express-validator');
const userauth = require('../middleware/userAuth');

module.exports = (app) => {
    //Create a user using POST at '/api/user/createuser'. No Login required
    app.post('/api/user/createuser',
        body('email').isEmail().withMessage("Invalid Email"),
        body('name', "Name is invald or too short").isLength({ min: 4 }),
        body('password').isLength({ min: 6 }).withMessage("Password is too short")
        , userController.createuser);

    //Authenticate user using POST at '/api/user/login'. No Login required
    app.post('/api/user/login',
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').exists().withMessage("Password cannot be blank")
        , userController.loginuser);

    //Get logged user details using POST at '/api/user/userdetails'. Login required
    app.post('/api/user/userdetails', userauth, userController.userdetails);
}
const express = require('express');
const User = require('../models/user.model');
const router = express.Router()
const { body, validationResult } = require('express-validator');

//Creaate a user using POST 'api/auth'. Dosent require authentication
router.post('/createuser',
    body('email').isEmail().withMessage("Invalid Email"),
    body('name', "Name is invald or too short").isLength({ min: 4 }),
    body('password').isLength({ min: 6 }).withMessage("Password is too short")
    , async (req, res) => {
        try {
            // Check if the user with the email exists or not
            let userExixts = await User.findOne({ email: req.body.email });
            if (userExixts) {
                return res.status(400).send({ error: "Sorry! a user with email already exists try another" });
            }

            // Check for errors in validation
            const error = validationResult(req);
            if (error.isEmpty()) {
                // Store the user data in database
                const user = new User(req.body);
                await user.save() // save in database
                    .then((result) => {
                        res.status(200).send(result);
                    }).catch((err) => {
                        res.status(400).json(err.message);
                    });
            } else {
                res.status(400).json({ errors: error.array() });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    })


module.exports = router
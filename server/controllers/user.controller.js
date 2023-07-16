const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

exports.createuser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user with the email exists or not
        let userExixts = await User.findOne({ email });
        if (userExixts) {
            return res.status(400).send({ success: false, message: "User Already Exists" });
        }

        // Check for any errors in validation
        const error = validationResult(req);
        if (error.isEmpty()) {
            // Password salt generator with syncronus function
            const salt = bcrypt.genSaltSync(10);
            const securePass = bcrypt.hashSync(password, salt);

            // Create a new user and save in DB
            const user = await User.create({
                name,
                email,
                password: securePass
            });

            const data = {
                user: {
                    id: user.id,
                },
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET)
            res.status(201).json({
                success: true,
                message: "Account created successfully",
                authToken
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

exports.loginuser = async (req, res) => {
    try {
        // Check if the user with the email exists or not
        const { email, password } = req.body;
        let userExixts = await User.findOne({ email });
        if (!userExixts) {
            return res.status(400).send({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const passwordVerify = bcrypt.compareSync(password, userExixts.password);
        if (!passwordVerify) {
            return res.status(400).send({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const data = {
            user: {
                id: userExixts.id,
            },
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            message: "Login Successful",
            authToken
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

exports.userdetails = async (req, res) => {
    try {
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}
const express = require('express');
const User = require('../models/User');
const router = express.Router()

//Creaate a user using POST 'api/auth'. Dosent require authentication
router.post('/', async (req, res) => {
    const user = new User(req.body);
    res.send(req.body)
    await user.save()
        .then((result) => {
            console.log("The result is successfully stored in the database", result);
        }).catch((err) => {
            console.log(err);
        });
    // console.log(req.body);
})

module.exports = router
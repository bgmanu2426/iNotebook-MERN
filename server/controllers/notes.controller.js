const Note = require('../models/notes.model');
const { body, validationResult } = require('express-validator');

exports.fetchallnotes = async (req, res) => {
    try {
        const Notes = await Note.find({ user: req.user.id });
        res.json(Notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

exports.createnotes = async (req, res) => {
    try {
        // Check for any errors in validation
        const error = validationResult(req);
        if (error.isEmpty()) {
        } else {
            res.status(400).json({ errors: error.array() });
        }

        const { title, description, tag } = req.body;
        const notes = await Note.create({
            title, description, tag, user: req.user.id
        })
        res.json(notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

exports.updatenotes = async (req, res) => {

}

exports.deletenotes = async (req, res) => {

}
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
            return res.status(400).json({ errors: error.array() });
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

exports.updatenote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create new note Object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Check for the note belongs to the user or not
        const checkUser = await Note.findById(req.params.id);
        if (!checkUser) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }
        if (checkUser.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Access Denied" });
        }

        // Get the Note ID to be updated in database
        const note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.status(200).json({ note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}

exports.deletenote = async (req, res) => {
    try {
        // Check for the note belongs to the user or not
        const checkUser = await Note.findById(req.params.id);
        if (!checkUser) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }
        if (checkUser.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Access Denied" });
        }

        // Get the Note ID to be updated in database
        const note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Note has been deleted", note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
}
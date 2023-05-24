const userController = require('../controllers/notes.controller');
const { body, validationResult } = require('express-validator');
const userauth = require('../middleware/userAuth');

module.exports = (app) => {
    //Fetch all notes using GET at '/api/notes/fetchallnotes'. Login required
    app.get("/api/notes/fetchallnotes", userauth, userController.fetchallnotes);

    //Create a note using POST at '/api/user/createnotes'. Login required
    app.post("/api/notes/createnotes",
        userauth,
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('description', "Enter a valid description").isLength({ min: 7 }),
        userController.createnotes
    );

    //Update a note using POST at '/api/user/updatenote'. Login required
    app.put("/api/notes/updatenote/:id",
        userauth,
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('description', "Enter a valid description").isLength({ min: 7 }),
        userController.updatenote);

    //Delete a note using POST at '/api/user/deletenote'. Login required
    app.delete("/api/notes/deletenote/:id", userauth, userController.deletenote);
}
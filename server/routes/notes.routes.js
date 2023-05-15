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
        body('description').isLength({ min: 7 }).withMessage("Enter a valid description"),
        userController.createnotes
    );

    //Update a note using POST at '/api/user/updatenotes'. Login required
    app.put("/api/notes/updatenotes",
        userauth,
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('password').isLength({ min: 7 }).withMessage("Enter a valid description"),
        userController.updatenotes);

    //Delete a note using POST at '/api/user/deletenotes'. Login required
    app.delete("/api/notes/deletenotes", userauth, userController.deletenotes);
}
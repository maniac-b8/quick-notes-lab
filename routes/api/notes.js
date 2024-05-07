const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');

//ALL Routes start with "/api/notes"

// GET all notes for the logged-in user
router.get('/', notesCtrl.getAllNotes);
// POST a new note for the logged-in user
router.post('/', notesCtrl.addNote);

module.exports = router;

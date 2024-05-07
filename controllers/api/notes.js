const Note = require('../../models/note');

module.exports = {
    getAllNotes,
    addNote
  };

async function getAllNotes(req, res) {
  try {
    const userId = req.user._id; 
    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addNote(req, res) {
  try {
    const userId = req.user._id; 
    const { text } = req.body;
    const newNote = new Note({ text, user: userId });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

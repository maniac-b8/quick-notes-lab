import { useState, useEffect } from 'react';
import { getNotes, addNote } from '../../utilities/notes-service';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    
    fetchNotes();
  }, []); 

  async function handleAddNote() {
    if (!newNoteText) return;
    try {
      const addedNote = await addNote({ text: newNoteText });
      setNotes([...notes, addedNote]);
      setNewNoteText('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <p>Feel free to leave a note!</p>
        <textarea value={newNoteText} onChange={e => setNewNoteText(e.target.value)} />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      {notes.length === 0 && <p>No Notes Yet!</p>}
      {notes.map(note => (
        <div key={note._id}>
          <p>{note.text}</p>
          <p>Date: {new Date(note.createdAt).toLocaleDateString()}</p>
          <p>Time: {new Date(note.createdAt).toLocaleTimeString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

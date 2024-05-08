import { getToken } from './users-service';
const BASE_URL = '/api/notes'; 

export async function getNotes() {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(BASE_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Unable to fetch notes');
  }

  return response.json();
}

export async function addNote(noteData) {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(noteData)
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Unable to add note');
  }

  return response.json();
}
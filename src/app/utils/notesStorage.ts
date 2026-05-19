import { Note } from '../types/notes';

const NOTES_KEY = 'app_notes';

export const notesStorage = {
  getNotes: (): Note[] => {
    try {
      const notes = localStorage.getItem(NOTES_KEY);
      return notes ? JSON.parse(notes) : [];
    } catch {
      return [];
    }
  },

  saveNotes: (notes: Note[]): void => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  addNote: (note: Note): void => {
    const notes = notesStorage.getNotes();
    notes.unshift(note);
    notesStorage.saveNotes(notes);
  },

  updateNote: (noteId: string, updates: Partial<Note>): void => {
    const notes = notesStorage.getNotes();
    const index = notes.findIndex(n => n.id === noteId);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
      notesStorage.saveNotes(notes);
    }
  },

  deleteNote: (noteId: string): void => {
    const notes = notesStorage.getNotes();
    const filtered = notes.filter(n => n.id !== noteId);
    notesStorage.saveNotes(filtered);
  }
};

import Note from '../models/Note';

// Create a new note
export const createNote = async (title: string, content: string) => {
  try {
    const note = await Note.create({ title, content });
    return note;
  } catch (error) {
    throw new Error('Error creating note: ' + error);
  }
};

// Get all notes
export const getAllNotes = async () => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return notes;
  } catch (error) {
    throw new Error('Error fetching notes: ' + error);
  }
};

// Get a single note by ID
export const getNoteById = async (id: string) => {
  try {
    const note = await Note.findById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  } catch (error) {
    throw new Error('Error fetching note: ' + error);
  }
};

// Update a note
export const updateNote = async (id: string, title: string, content: string) => {
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  } catch (error) {
    throw new Error('Error updating note: ' + error);
  }
};

// Delete a note
export const deleteNote = async (id: string) => {
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  } catch (error) {
    throw new Error('Error deleting note: ' + error);
  }
}; 
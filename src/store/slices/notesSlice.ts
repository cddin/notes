import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '@/types/note';

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  editNote: Note | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  editNote: null
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
      state.editNote = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setEditNote: (state, action: PayloadAction<Note>) => {
      state.editNote = action.payload;
    },
  },
});

// export const { setNotes, addNote, updateNote, deleteNote, setLoading, setError } = notesSlice.actions;
export const { setNotes, setLoading, setError, setEditNote } = notesSlice.actions;
export default notesSlice.reducer; 
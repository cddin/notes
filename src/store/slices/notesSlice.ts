import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '@/types/note';

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// export const { setNotes, addNote, updateNote, deleteNote, setLoading, setError } = notesSlice.actions;
export const { setNotes, setLoading, setError } = notesSlice.actions;
export default notesSlice.reducer; 
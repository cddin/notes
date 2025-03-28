'use client';

import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ActionContainer, BackButton, Container, DashboardGrid, Header, Title } from './styles';
import NoteCard from '@/components/NoteCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNotes, addNote, deleteNote, setLoading, setError } from '@/store/slices/notesSlice';
import { Note } from '@/types/note';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { notes, loading } = useAppSelector((state: { notes: { notes: Note[]; loading: boolean } }) => state.notes);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      dispatch(setNotes(data));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch notes'));
    }
  };

  const onAddHandler = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: "hardcoded title",
          content: "hardcoded content"
        }),
      });
      if (!response.ok) throw new Error('Failed to create note');
      const newNote = await response.json();
      dispatch(addNote(newNote));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to create note'));
    }
  };

  const onDeleteHandler = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete note');
      dispatch(deleteNote(id));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to delete note'));
    }
  };

  if (!isMounted) return null;
  
  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
        <BackButton href="/">
          ← 
        </BackButton>
      </Header>
      <ActionContainer>
        <Button onClick={onAddHandler}>Add Note</Button>
        <div>{loading ? "Loading..." : ""}</div>
      </ActionContainer>
      
      <DashboardGrid>
        {notes && notes.map((note:Note) => (
          <NoteCard 
            key={note._id} 
            note={note} 
            onDeleteHandler={onDeleteHandler}
          />
        ))}
      </DashboardGrid>
    </Container>
  );
} 
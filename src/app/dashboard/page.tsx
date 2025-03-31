'use client';

import { useEffect, useState } from 'react';
import { ActionContainer, BackButton, Container, DashboardGrid, Header, Title, StyledLink } from './styles';
import NoteCard from '@/components/NoteCard';
import { useAppSelector } from '@/store/hooks';
import { Note } from '@/types/note';
import { useApiNotes } from '@/hooks/useApiNotes';
import { setEditNote } from '@/store/slices/notesSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
export default function EditPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector((state: { notes: { notes: Note[], loading: boolean, error: string | null } }) => ({
    notes: state.notes.notes,
    loading: state.notes.loading, 
    error: state.notes.error || ''
  }));
  const [isMounted, setIsMounted] = useState(false);
  const { get, remove } = useApiNotes();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    get();
  };

  const onDeleteHandler = async (id: string) => {
    remove(id);
  };

  const onEditHandler = async (note: Note) => {
    dispatch(setEditNote(note));
    router.push('/edit');
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
        <StyledLink href="/new">Add Note</StyledLink>
        <div>{loading ? "Loading..." : ""}</div>
        <div>{error ? error : ""}</div>
      </ActionContainer>
      
      <DashboardGrid>
        {notes && notes.map((note:Note) => (
          <NoteCard 
            key={note._id} 
            note={note} 
            onDeleteHandler={onDeleteHandler}
            onClickHandler={() => {
              onEditHandler(note);
            }}
          />
        ))}
      </DashboardGrid>
    </Container>
  );
} 
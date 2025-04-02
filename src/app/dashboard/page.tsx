'use client';

import { useEffect, useState } from 'react';
import { ActionContainer, Container, DashboardGrid, Header, Title } from './styles';
import NoteCard from '@/components/NoteCard';
import { useAppSelector } from '@/store/hooks';
import { Note } from '@/types/note';
import { useApiNotes } from '@/hooks/useApiNotes';
import { setEditNote } from '@/store/slices/notesSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import LinkButton from '@/components/LinkButton';
export default function EditPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notes, loading, error, editNote } = useAppSelector((state: { notes: { notes: Note[], loading: boolean, error: string | null, editNote: Note | null } }) => ({
    notes: state.notes.notes,
    loading: state.notes.loading, 
    error: state.notes.error || '',
    editNote: state.notes.editNote
  }));
  const [isMounted, setIsMounted] = useState(false);
  const { get, remove } = useApiNotes();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem('editNote', JSON.stringify(editNote));
  }, [editNote]);

  const fetchNotes = async () => {
    get();
  };

  const onDeleteHandler = async (id: string) => {
    remove(id);
  };

  const onEditHandler = async (note: Note) => {
    dispatch(setEditNote(note));
    router.push('/view');
  };

  

  if (!isMounted) return null;

  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
        <LinkButton href="/">
          ← 
        </LinkButton>
      </Header>
      <ActionContainer>
        <LinkButton href="/new">Add Note</LinkButton>
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
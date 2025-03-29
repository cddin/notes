'use client';

import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ActionContainer, BackButton, Container, DashboardGrid, Header, Title } from './styles';
import NoteCard from '@/components/NoteCard';
import { useAppSelector } from '@/store/hooks';
import { Note } from '@/types/note';
import { useApiNotes } from '@/hooks/useApiNotes';
export default function DashboardPage() {
  const { notes, loading, error } = useAppSelector((state: { notes: { notes: Note[], loading: boolean, error: string | null } }) => ({
    notes: state.notes.notes,
    loading: state.notes.loading, 
    error: state.notes.error || ''
  }));
  const [isMounted, setIsMounted] = useState(false);
  const { get, create, remove } = useApiNotes();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    get();
  };

  const onAddHandler = async () => {
    create({
      title: "hardcoded title",
      content: "hardcoded content" + Math.random()
    });
 
  };

  const onDeleteHandler = async (id: string) => {
    remove(id);
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
        <div>{error ? error : ""}</div>
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
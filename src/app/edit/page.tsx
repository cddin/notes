'use client';

// import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ActionContainer, Container, Header, Title } from './styles';
// import NoteCard from '@/components/NoteCard';
// import { useAppSelector } from '@/store/hooks';
// import { Note } from '@/types/note';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useApiNotes } from '@/hooks/useApiNotes';
import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm';
import { Note } from '@/types/note';
import LinkButton from '@/components/LinkButton';
import { setEditNote } from '@/store/slices/notesSlice';
export default function EditPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { update} = useApiNotes();
  const { editNote } = useAppSelector((state: { notes: { editNote: Note | null } }) => ({
    editNote: state.notes.editNote,
  }));

  useEffect(() => {
    setIsMounted(true);
    const storedNote = localStorage.getItem('editNote');
    if (storedNote) {
      dispatch(setEditNote(JSON.parse(storedNote)));
    }
  }, []);

  const onAddHandler = async (data: { title: string; content: string }) => {
    if (!editNote?._id) return;
    await update(editNote._id, {
      title: data.title,
      content: data.content
    });
    router.push('/dashboard'); 
  };

  if (!isMounted) return null;

  return (
    <Container>
      <Header>
        <Title>Edit</Title>
        <LinkButton href="/dashboard">
          ← 
        </LinkButton>
      </Header>
      <ActionContainer>
      </ActionContainer>
      {editNote && (
        <NoteForm 
          onSubmit={onAddHandler} 
          initialData={{ title: editNote.title, content: editNote.content }} 
        />
      )}
    </Container>
  );
} 
'use client';

// import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ActionContainer, Container, Header, TextArea, Title, SimpleCard } from './styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEditNote } from '@/store/slices/notesSlice';
import { Note } from '@/types/note';
import LinkButton from '@/components/LinkButton';
import HtmlClamp from '@/components/HtmlRenderer';
export default function ViewPage() {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

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
        <LinkButton href="/edit">Edit</LinkButton>
      </ActionContainer>
      <SimpleCard>
      {editNote && (
        <TextArea>
          <h1>{editNote.title}</h1>
          <HtmlClamp html={editNote.content} lines={100} />
        </TextArea>
      )}
      </SimpleCard>
    </Container>
  );
} 
'use client';

// import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ActionContainer, Container, Header, TextArea, Title } from './styles';
import { useAppSelector } from '@/store/hooks';
import { Note } from '@/types/note';
import LinkButton from '@/components/LinkButton';
import HtmlClamp from '@/components/HtmlRenderer';
export default function ViewPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { editNote } = useAppSelector((state: { notes: { editNote: Note | null } }) => ({
    editNote: state.notes.editNote,
  }));

  useEffect(() => {
    setIsMounted(true);
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
      {editNote && (
        <TextArea>
          <h1>{editNote.title}</h1>
          <HtmlClamp html={editNote.content} lines={100} />
        </TextArea>
      )}
    </Container>
  );
} 
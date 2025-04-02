'use client';

// import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ActionContainer, Container, Header, Title } from './styles';
// import NoteCard from '@/components/NoteCard';
// import { useAppSelector } from '@/store/hooks';
// import { Note } from '@/types/note';
import { useApiNotes } from '@/hooks/useApiNotes';
import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm';
import LinkButton from '@/components/LinkButton';
export default function CreateNewPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { create } = useApiNotes();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const onAddHandler = async (data: { title: string; content: string }) => {
    await create({
      title: data.title,
      content: data.content
    });
    router.push('/dashboard'); 
  };

  if (!isMounted) return null;

  return (
    <Container>
      <Header>
        <Title>Create New Notes</Title>
        <LinkButton href="/dashboard">
          ← 
        </LinkButton>
      </Header>
      <ActionContainer>
      </ActionContainer>
      <NoteForm onSubmit={onAddHandler} />
    </Container>
  );
} 
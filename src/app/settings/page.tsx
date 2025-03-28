'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { BackButton, Button, Container, Header } from './styles';
// background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);



export default function NotesPage() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  if (!isMounted) return null;
  return (
    <Container>
      <Header>
        <BackButton href="/">
          ← Back to Home
        </BackButton>
      </Header>
      hello
      <Button onClick={toggleTheme}>
          Change theme
        </Button>
    </Container>
  );
} 
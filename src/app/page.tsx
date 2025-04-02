'use client';

import LinkButton from '@/components/LinkButton';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Container>
      <Title>Welcome to Notes App</Title>
      <Description>
        Manage your notes here.
      </Description>
      <ButtonGroup>
        <LinkButton href="/settings">
          Setting
        </LinkButton>
        <LinkButton href="/dashboard">
          Go to Dashboard
        </LinkButton>
      </ButtonGroup>
    </Container>
  );
}

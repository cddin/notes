import Link from "next/link";
import { styled } from "styled-components";

export const Container = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 4xl;
  margin: 0 auto 2rem;
`;

export const Button = styled.div`
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
`;
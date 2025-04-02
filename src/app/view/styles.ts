import { styled } from "styled-components";

export const Container = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  max-width: 4xl;
  margin: 0 auto 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(298px, 1fr));
  gap: 2rem;
  max-width: 4xl;
  margin: 0 auto;
`;

export const ActionContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
`;

export const TextArea = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
`;
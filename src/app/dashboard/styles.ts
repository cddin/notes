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
  gap: 2rem;
  margin: 0 auto;
  max-width: 1440px;

  grid-template-columns: repeat(1, 1fr); 
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-template-columns: repeat(3, 1fr); 
}

@media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr); 
}
`;

export const ActionContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;
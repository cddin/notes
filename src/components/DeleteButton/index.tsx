import { ButtonHTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";

type ButtonProps = {
    children: ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>;

const Container = styled.button`
  background-color: red;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;

  border: none;

  &:hover {
    background-color: #ff9909;
    transform: translateY(-1px);
  }
`;

const DeleteButton = ({ children, ...props }: ButtonProps) => {
    return (
      <Container {...props}>
        {children}
      </Container>
    );
  };

export default DeleteButton;
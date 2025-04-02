import { styled } from "styled-components";
import { Note } from "@/types/note";
import HtmlClamp from "../HtmlRenderer";
import DeleteButton from "../DeleteButton";

 const Card = styled.div`
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow: hidden;
  background:${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

 const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const NoteCard = ({note, onDeleteHandler, onClickHandler}:{note:Note, onDeleteHandler:(id:string)=>void, onClickHandler:()=>void}) => {
  return (
    <Card key={note._id} onClick={onClickHandler}>
            <CardTitle>{note.title}</CardTitle>

              <HtmlClamp html={note.content} />
            <DeleteButton onClick={(e)=>{e.stopPropagation(); onDeleteHandler(note._id)}}>delete</DeleteButton>
          </Card>
  );
};

export default NoteCard;
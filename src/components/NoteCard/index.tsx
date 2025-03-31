import { styled } from "styled-components";
import Button from "../Button";
import { Note } from "@/types/note";

 const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

 const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

 const CardContent = styled.p`
  color: #4b5563;
  line-height: 1.5;
`;

const NoteCard = ({note, onDeleteHandler, onClickHandler}:{note:Note, onDeleteHandler:(id:string)=>void, onClickHandler:()=>void}) => {
  return (
    <Card key={note._id} onClick={onClickHandler}>
            <CardTitle>{note.title}</CardTitle>
            <CardContent>{note.content}</CardContent>
            <Button onClick={(e)=>{e.stopPropagation(); onDeleteHandler(note._id)}}>x</Button>
          </Card>
  );
};

export default NoteCard;
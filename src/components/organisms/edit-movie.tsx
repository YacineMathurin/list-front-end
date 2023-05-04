import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { EditFormMovie } from "../molecules/edit-form-movie";
import { Button } from "../atoms/button";

export const EditMovie = () => {
  const { state } = useLocation();
  const { movie } = state;
  console.log("Movie", movie);

  return (
    <div>
      <h1>Editing movie</h1>
      <DeleteDiv>
        <Button variant="danger">delete</Button>
      </DeleteDiv>
      <EditFormMovie dataFields={movie} />
    </div>
  );
};
const DeleteDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

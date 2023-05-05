import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { EditFormMovie } from "../molecules/edit-form-movie";
import { Button } from "../atoms/button";

export const EditMovie = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { movie } = state;

  const handleMovieDelection = async () => {
    const url = "http://localhost:3000/movie/delete";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movie.id, thumbnailPath: movie.thumbnail }),
      });
      const data = await response.json();
      console.log("Response after delete", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Editing movie</h1>
      <DeleteDiv>
        <Button variant="danger" onClick={handleMovieDelection}>
          delete
        </Button>
      </DeleteDiv>
      <EditFormMovie dataFields={movie} />
    </div>
  );
};
const DeleteDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

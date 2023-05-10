import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { EditFormMovie } from "../molecules/edit-form-movie";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../atoms/button";

export const EditMovie = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { movie } = state;
  const toast = useToast();

  const handleMovieDelection = async () => {
    const url = `${process.env.REACT_APP_SERVER_HOST}/movies/delete`;
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movie.id, thumbnailPath: movie.thumbnail }),
      });
      toast("Movie Deleted !");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button label="back" onClick={() => navigate(-1)} />
      <h1>Editing movie</h1>
      <DeleteDiv>
        <Button label="delete" onClick={handleMovieDelection} />
      </DeleteDiv>
      <EditFormMovie dataFields={movie} />
    </div>
  );
};
const DeleteDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

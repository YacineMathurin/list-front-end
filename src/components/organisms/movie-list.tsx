import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../atoms/button";
import { useFetch } from "../../hooks/use-fetch";

export const MovieList = () => {
  const navigate = useNavigate();

  const {
    loading,
    data: movies,
    error,
  } = useFetch(`${process.env.REACT_APP_SERVER_HOST}/movies`);

  useEffect(() => {}, [movies]);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h6>Something whent wrong</h6>;
        <Button onClick={() => navigate(0)}>Reload Page</Button>
      </>
    );
  }

  if (!movies.length) {
    return (
      <>
        <h6>No movie yet</h6>
        <Button onClick={() => navigate("/add-movie")}>New movie</Button>
      </>
    );
  }

  return (
    <Wrapper>
      <h1>All movies</h1>
      <Button onClick={() => navigate("/add-movie")}>new movie</Button>

      <Container>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`${process.env.REACT_APP_SERVER_HOST}/uploads/${movie.thumbnail}`}
              alt={`Thumbnail - ${movie.title}`}
              width={"150px"}
              height={"55px"}
            />
            <Title>{movie.title}</Title>
            <Description>{movie.description}</Description>
            <Button
              onClick={() =>
                navigate("/edit-movie", {
                  state: { movie },
                })
              }
              size="sm"
            >
              Edit
            </Button>
          </div>
        ))}
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  margin: 1em auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;

  @media screen and (min-width: 1280px) {
    max-width: 80%;
  }
`;

const Wrapper = styled.div`
  padding: 2em;
`;

const Title = styled.span`
  display: block;
`;

const Description = styled(Title)`
  font-size: 12px;
`;

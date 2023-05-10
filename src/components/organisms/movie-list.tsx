import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../../hooks/use-fetch";
import { Button } from "../atoms/button";
import { Card } from "../molecules/card";

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
        <Button onClick={() => navigate(0)} label="Reload Page" />
      </>
    );
  }

  if (!movies.length) {
    return (
      <>
        <h6>No movie yet</h6>
        <Button
          onClick={() => navigate("/add-movie")}
          label="New
         movie"
        />
      </>
    );
  }

  return (
    <Wrapper>
      <h1>All movies</h1>
      <Button
        onClick={() => navigate("/add-movie")}
        label="New movie"
        primary
      />

      <Container>
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            description={movie.description}
            alt={movie.title}
            imageSrc={`${process.env.REACT_APP_SERVER_HOST}/uploads/${movie.thumbnail}`}
            onButtonClick={() =>
              navigate("/edit-movie", {
                state: { movie },
              })
            }
          />
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

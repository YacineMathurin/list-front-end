import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import styled from "styled-components";
import { Button } from "../atoms/button";

type MoviesType = {
  id: string;
  title: string;
  description: string;

  thumbnail: {
    data: Buffer;
  };
}[];

type UseFetchProps = {
  loading: boolean;
  data: MoviesType;
};

function useFetch(url: string): UseFetchProps {
  const [state, setState] = useState<{
    loading: boolean;
    data: MoviesType;
  }>({
    loading: true,
    data: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState({ ...state, loading: false, data });
      })
      .catch((err) => console.error(err));

    return () => {
      controller.abort();
    };
  }, []);

  return state;
}

export const MovieList = () => {
  const navigate = useNavigate();
  const { loading, data: movies } = useFetch("http://localhost:3000/movie");

  useEffect(() => {}, [movies]);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
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
              src={`http://localhost:3000/uploads/${movie.thumbnail}`}
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
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
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

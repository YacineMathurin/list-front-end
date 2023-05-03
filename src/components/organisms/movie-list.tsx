import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import styled from "styled-components";

type MoviesType = {
  id: string;
  name: string;
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
        <button onClick={() => navigate("/add-movie")}>Add movie</button>
      </>
    );
  }

  return (
    <div>
      <h1>All movies</h1>
      <button onClick={() => navigate("/add-movie")}>Add movie</button>
      <Container>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`http://localhost:3000/uploads/${movie.thumbnail}`}
              alt={`Thumbnail - ${movie.name}`}
              width={"150px"}
              height={"55px"}
            />
            <p>{movie.name}</p>
            <p>{movie.description}</p>
            <button onClick={() => navigate("/edit-movie")}>Edit</button>
          </div>
        ))}
      </Container>
    </div>
  );
};

const Container = styled.div`
  margin-top: 1em;
  display: flex;
  gap: 1em;
`;

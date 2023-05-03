import { useState } from "react";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Title } from "./components/atoms/title";
import { Form } from "./components/molecules/form";
import { Counter } from "./components/organisms/counter";
import { MovieList } from "./components/organisms/movie-list";
import { AddMovie } from "./components/organisms/add-movie";
import { EditMovie } from "./components/organisms/edit-movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieList />,
  },
  {
    path: "/add-movie",
    element: <AddMovie />,
  },
  {
    path: "/edit-movie",
    element: <EditMovie />,
  },
]);

function App() {
  const [title, setTitle] = useState("");

  const initialCount = 0;

  return (
    <Wrapper>
      {/* <Title text={title} />
      <Form onSubmit={setTitle} />
      <Counter initialCount={initialCount} />
      <br></br> */}
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  gap: 1em;
`;

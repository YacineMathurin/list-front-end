import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieList } from "./components/organisms/movie-list";
import { AddMovie } from "./components/organisms/add-movie";
import { EditMovie } from "./components/organisms/edit-movie";
import "toastify-js/src/toastify.css";

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
  return (
    <Wrapper>
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

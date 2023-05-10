import styled from "styled-components";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { MovieList } from "./components/organisms/movie-list";
import { AddMovie } from "./components/organisms/add-movie";
import { EditMovie } from "./components/organisms/edit-movie";
import { Header } from "./components/molecules/header";

import "toastify-js/src/toastify.css";

function Main() {
  const user = {
    name: "New user",
  };
  return (
    <div>
      <Header
        onLogin={() => {}}
        onLogout={() => {}}
        onCreateAccount={() => {}}
        user={user}
      />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
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
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

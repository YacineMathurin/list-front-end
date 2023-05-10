import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/button";
import { AddFormMovie } from "../molecules/add-form-movie";

export const AddMovie = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button label="back" onClick={() => navigate(-1)} />
      <h1>Adding movie</h1>
      <AddFormMovie />
    </div>
  );
};

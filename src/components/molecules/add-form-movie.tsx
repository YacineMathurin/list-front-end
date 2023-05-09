import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Button } from "../atoms/button";

export const AddFormMovie = () => {
  let disabledForm = true;

  const { register, handleSubmit, watch, reset } = useForm();

  const title = watch("title");
  const description = watch("description");
  const thumbnail = watch("thumbnail")?.[0];

  const onSubmit = async () => {
    const url = `http://localhost:3000/movie/upload`;

    const formData = new FormData();
    formData.append("thumbnail", thumbnail as File);
    formData.append("title", title);
    formData.append("description", description);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Saved Movie");
        reset();
      })
      .catch((err) => console.error(err));
  };

  if (title?.trim() && description?.trim() && thumbnail) {
    disabledForm = false;
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fields>
          <Label htmlFor="">
            Title
            <Input {...register("title")} type="text" placeholder="Top Gun" />
          </Label>
          <Label htmlFor="">
            Description
            <Input
              {...register("description")}
              type="text"
              placeholder="A super cool movie"
            />
          </Label>
          <Label htmlFor="">
            Thumbnail
            <Input {...register("thumbnail")} type="file" accept="image/*" />
          </Label>
        </Fields>
        <SubmitButtonContainer>
          <Button type="submit" disabled={disabledForm}>
            save
          </Button>
        </SubmitButtonContainer>
      </Form>
      {thumbnail && (
        <Preview>
          <Image
            alt="Movie Thumbnail"
            width={"150px"}
            src={URL.createObjectURL(thumbnail)}
          />
          <span>{title}</span>
          <span>{description}</span>
        </Preview>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  display: block;
  padding: 0.3em;
  width: -webkit-fill-available;
`;

const Image = styled.img`
  margin-top: 1em;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
`;
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;
const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1em;
`;

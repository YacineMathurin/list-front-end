import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const FormMovie = () => {
  let disabledForm = true;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageUpload = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const movie = {
      name: title,
      description,
      thumbnail: selectedImage,
    };
    console.log("Movie", movie);

    const url = `http://localhost:3000/movie/upload`;

    const formData = new FormData();
    formData.append("image", selectedImage as File);
    formData.append("name", title);
    formData.append("description", description);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved Movie", data);
      })
      .catch((err) => console.error(err));
  };

  if (title && description && selectedImage) {
    disabledForm = false;
  }

  return (
    <>
      <Form method="post">
        <div>
          <Label htmlFor="">
            Name
            <Input
              type="text"
              onChange={(e) => setTitle(e.currentTarget.value.trim())}
            />
          </Label>
          <Label htmlFor="">
            Description
            <Input
              type="text"
              onChange={(e) => setDescription(e.currentTarget.value.trim())}
            />
          </Label>
          <Label htmlFor="">
            Thumbnail
            <Input type="file" onChange={handleImageUpload} accept="image/*" />
          </Label>
        </div>

        <Button type="submit" onClick={handleSubmit} disabled={disabledForm}>
          save
        </Button>
      </Form>
      {selectedImage && (
        <Preview>
          <Image
            alt="Movie Thumbnail"
            width={"150px"}
            src={URL.createObjectURL(selectedImage as File)}
          />
          <span>{title}</span>
          <span>{description}</span>
        </Preview>
      )}
    </>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  padding-left: 1em;
`;

const Input = styled.input`
  margin-left: 0.3em;
`;

const Button = styled.button`
  float: right;
  margin-top: 1em;
`;

const Image = styled.img`
  margin-top: 1em;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
`;

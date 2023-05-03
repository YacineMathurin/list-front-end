import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

export const FormMovie = () => {
  let disabledForm = true;

  const fileInputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailVal, setThumbnailVal] = useState("");

  const handleImageUpload = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];
    console.log(file.name);

    setSelectedImage(file);
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setSelectedImage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const movie = {
      title,
      description,
      thumbnail: selectedImage,
    };
    console.log("Movie", movie);

    const url = `http://localhost:3000/movie/upload`;

    const formData = new FormData();
    formData.append("image", selectedImage as File);
    formData.append("title", title);
    formData.append("description", description);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved Movie", data);
        resetFields();
        fileInputRef.current.value = "";
      })
      .catch((err) => console.error(err));
  };

  if (title.trim() && description.trim() && selectedImage) {
    disabledForm = false;
  }

  return (
    <Wrapper>
      <Form method="post">
        <Fields>
          <Label htmlFor="">
            Title
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </Label>
          <Label htmlFor="">
            Description
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </Label>
          <Label htmlFor="">
            Thumbnail
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
            />
          </Label>
        </Fields>

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
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

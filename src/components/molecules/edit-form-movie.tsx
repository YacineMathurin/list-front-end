import { FC, FormEvent, useState } from "react";
import styled from "styled-components";
import { Button } from "../atoms/button";

type EditMovieProps = {
  dataFields: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
};

type GetImageProps = {
  dataFields: EditMovieProps["dataFields"];
  selectedImage: File | string;
};

type GetTitleProps = {
  dataFields: EditMovieProps["dataFields"];
  title: string;
};

const GetImage: FC<GetImageProps> = ({ dataFields, selectedImage }) => {
  if (typeof selectedImage === "string") {
    return (
      <Image
        src={`http://localhost:3000/uploads/${dataFields.thumbnail}`}
        alt={`Thumbnail - ${dataFields.title}`}
        width={"150px"}
        height={"55px"}
      />
    );
  }
  return (
    <Image
      alt="Movie Thumbnail"
      width={"150px"}
      src={URL.createObjectURL(selectedImage)}
    />
  );
};

const GetTitle: FC<GetTitleProps> = ({ title, dataFields }) => {
  if (title.trim() === dataFields.title) {
    return <span>Title</span>;
  }
  return <UpdatedTitle>Updated title</UpdatedTitle>;
};

export const EditFormMovie: FC<EditMovieProps> = ({ dataFields }) => {
  let disabledForm = true;

  const [selectedImage, setSelectedImage] = useState<File | string>(
    dataFields.thumbnail
  );
  const [title, setTitle] = useState(dataFields.title);
  const [description, setDescription] = useState(dataFields.description);

  const updatedTitle = title.trim() !== dataFields.title;
  const updatedDescription = description.trim() !== dataFields.description;
  const updatedThumbnail = selectedImage !== dataFields.thumbnail;

  const handleImageUpload = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];
    console.log(file.name);

    setSelectedImage(file);
  };

  const buildFormData = () => {
    const formData = new FormData();

    const updatedFields = {
      id: dataFields.id,
      ...(updatedTitle && { title }),
      ...(updatedDescription && { description }),
      ...(updatedThumbnail && { thumbnail: selectedImage }),
    };

    for (const [key, value] of Object.entries(updatedFields)) {
      formData.append(key, value);
    }

    return formData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `http://localhost:3000/movie/update`;
    const formData = buildFormData();

    fetch(url, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated Movie", data);
        alert("Movie Updated !");
      })
      .catch((err) => console.error(err));
  };

  if (updatedTitle || updatedDescription || updatedThumbnail) {
    disabledForm = false;
  }

  return (
    <Wrapper>
      <Form method="post">
        <Fields>
          <ThumbnailDiv>
            <GetImage dataFields={dataFields} selectedImage={selectedImage} />
            <Label htmlFor="">
              Edit thumbnail
              <Input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </Label>
          </ThumbnailDiv>
          <Label htmlFor="">
            <GetTitle dataFields={dataFields} title={title} />
            <Input
              type="text"
              value={title ? title : dataFields.title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </Label>
          <Label htmlFor="">
            Description
            <Input
              type="text"
              value={description ? description : dataFields.description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </Label>
        </Fields>

        <SubmitButtonContainer>
          <Button type="submit" onClick={handleSubmit} disabled={disabledForm}>
            save
          </Button>
        </SubmitButtonContainer>
      </Form>
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
  padding: 0.4em;
  width: -webkit-fill-available;
`;

const Image = styled.img`
  margin: 1em 0 1em;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  @media screen and (min-width: 1280px) {
    align-items: flex-end;
    flex-direction: row;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1em;
`;

const ThumbnailDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpdatedTitle = styled.span`
  color: goldenrod;
`;

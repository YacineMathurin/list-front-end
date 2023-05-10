import { FC } from "react";
import styled from "styled-components";
import { Button } from "../atoms/button";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/use-toast";

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
  thumbnail: File | string;
};

type GetTitleProps = {
  dataFields: EditMovieProps["dataFields"];
  title: string;
};

const GetImage: FC<GetImageProps> = ({ dataFields, thumbnail }) => {
  if (typeof thumbnail === "string") {
    return (
      <Image
        src={`${process.env.REACT_APP_SERVER_HOST}/uploads/${dataFields.thumbnail}`}
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
      src={URL.createObjectURL(thumbnail)}
    />
  );
};

const GetTitle: FC<GetTitleProps> = ({ title, dataFields }) => {
  if (title?.trim() === dataFields.title) {
    return <span>Title</span>;
  }
  return <UpdatedTitle>Updated title</UpdatedTitle>;
};

export const EditFormMovie: FC<EditMovieProps> = ({ dataFields }) => {
  let disabledForm = true;

  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      title: dataFields.title,
      description: dataFields.description,
      thumbnail: [dataFields.thumbnail],
    },
  });

  const title = watch("title");
  const description = watch("description");
  const thumbnail = watch("thumbnail")?.[0];

  const updatedTitle = title?.trim() !== dataFields.title;
  const updatedDescription = description?.trim() !== dataFields.description;
  const updatedThumbnail = thumbnail !== dataFields.thumbnail;
  const toast = useToast();

  const buildFormData = () => {
    const formData = new FormData();

    const updatedFields = {
      id: dataFields.id,
      ...(updatedTitle && { title }),
      ...(updatedDescription && { description }),
      ...(updatedThumbnail && { thumbnail }),
    };

    for (const [key, value] of Object.entries(updatedFields)) {
      formData.append(key, value);
    }

    return formData;
  };

  const onSubmit = async () => {
    console.log("on Submit called !", title, description, thumbnail);

    const url = `${process.env.REACT_APP_SERVER_HOST}/movies/update`;
    const formData = buildFormData();

    fetch(url, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        toast("Well done, movie Updated !");
      })
      .catch((err) => console.error(err));
  };

  console.log(
    "On default values",
    title,
    description,
    thumbnail,
    typeof watch("thumbnail")
  );

  if (updatedTitle || updatedDescription || updatedThumbnail) {
    disabledForm = false;
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fields>
          <ThumbnailDiv>
            <GetImage dataFields={dataFields} thumbnail={thumbnail} />
            <Label>
              Edit thumbnail
              <Input {...register("thumbnail")} type="file" accept="image/*" />
            </Label>
          </ThumbnailDiv>
          <Label>
            <GetTitle dataFields={dataFields} title={title} />
            <Input
              {...register("title")}
              type="text"
              value={title ? title : dataFields.title}
            />
          </Label>
          <Label>
            Description
            <Input
              {...register("description")}
              type="text"
              value={description ? description : dataFields.description}
            />
          </Label>
        </Fields>

        <SubmitButtonContainer>
          <Button label="save" type="submit" disabled={disabledForm} />
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

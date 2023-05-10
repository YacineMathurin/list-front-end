import styled from "styled-components";
import { Button } from "../../atoms/button";

type CardProps = {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  onButtonClick: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({
  imageSrc,
  alt,
  title,
  description,
  onButtonClick,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <img src={imageSrc} alt={alt} width={"150px"} height={"55px"} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Button size="small" label="Edit" onClick={onButtonClick} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 150px;
`;

const Title = styled.span`
  display: block;
`;

const Description = styled(Title)`
  font-size: 12px;
  margin-bottom: 0.5em;
`;

import styled from "styled-components";

type ButtonProps = {
  disabled?: boolean;
  size?: "sm" | "lg";
  variant?: "default" | "danger";
};

const getBgColor = (props: ButtonProps) => {
  if (props.disabled) {
    return "#ccc";
  }
  if (props.variant === "danger") {
    return "#ef476f";
  }
  return "#2b2d42";
};

export const Button = styled.button<{
  disabled?: boolean;
  size?: "sm" | "lg";
  variant?: "default" | "danger";
}>`
  padding: 0.5em;
  background-color: ${(props) => getBgColor(props)};
  color: white;
  border: 1px solid;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: ${(props) => (props.size === "sm" ? "10px" : "12px")};
  letter-spacing: 0.2em;
  transition: 0.3s;

  &:hover {
    letter-spacing: 0.25em;
  }
`;

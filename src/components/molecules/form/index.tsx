import { FC, FormEvent, useRef } from "react";
import styled from "styled-components";

export const Form: FC<{
  onSubmit: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onSubmit }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";

    onSubmit(email);
  };
  return (
    <div>
      <form action="post" autoComplete="off">
        <div>
          <Label htmlFor="">
            Email
            <Input type="text" ref={emailRef} data-testid="email-input" />
          </Label>
          <Label htmlFor="">
            Password
            <Input
              type="password"
              ref={passwordRef}
              data-testid="password-input"
            />
          </Label>
        </div>

        <Button type="submit" onClick={handleSubmit}>
          submit
        </Button>
      </form>
    </div>
  );
};

const Label = styled.label`
  padding-left: 1em;
`;
const Button = styled.button`
  float: right;
  margin-top: 1em;
`;
const Input = styled.input`
  margin-left: 0.3em;
`;

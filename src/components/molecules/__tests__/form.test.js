import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Form } from "../form";

beforeEach(()=>{
  console.log("BEFORE EACH TEST");
})

beforeAll(()=>{
  console.log("BEFORE ALL");
})

it("check the form is displayed", async () => {
  //  Mount the fomr component
  render(<Form />);

  // check form fields are on the page
  const emailInput = screen.getByTestId("email-input");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByTestId("password-input");
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();

  
});


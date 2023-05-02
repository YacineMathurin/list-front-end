import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

beforeEach(()=>{
  console.log("BEFORE EACH TEST");
})

beforeAll(()=>{
  console.log("BEFORE ALL");
})

it("check the form is displayed", async () => {

  const email = "yacine@gmail.com";
  const password = "azerty";

  //  Mount the fomr component
  render(<App />);

  // check form fields are on the page
  const emailInput = screen.getByTestId("email-input");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByTestId("password-input");
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();

  // Fill form's fields
  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);

  // Submit the form
  await userEvent.click(submitButton);

  // Check integration
  const emailToSubmit = screen.getByText(email);
  expect(emailToSubmit).toBeInTheDocument();
});


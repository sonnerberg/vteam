import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders links", () => {
  render(<App />);
  const map = screen.getByText(/karta/i);
  const account = screen.getByText(/konto/i);
  expect(map).toBeInTheDocument();
  expect(account).toBeInTheDocument();
});

/* test("login", async () => {
  render(<App />);
  const login = screen.getByText(/ta mig till github/i);
  const user = userEvent.setup();
  await user.click(login);
}); */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import UserCard from "./UserCard";

test("renders info", async () => {
  const data = {
    id: 1,
    surname: "John",
    lastname: "Doe",
    address: "Gymnastikgatan 55 632 20 Eskilstuna",
    "billing-adress": "Gymnastikgatan 55 632 20 Eskilstuna",
    username: "john1@somemail.com",
    pass: "",
    email: "john@somemail.com",
    balance: 1000,
    status: "online",
  };

  render(<UserCard content={data} />);

  const surname = await screen.findByText("John");
  const lastname = await screen.findByText("Doe");
  const adresses = await screen.findAllByText(/Gymnastikgatan/i);
  const usernames = await screen.findAllByText(/john1@somemail.com/i);
  const email = await screen.findAllByText(/john1@somemail.com/i);
  const balance = await screen.findByText("1000");

  expect(surname).toBeInTheDocument();
  expect(lastname).toBeInTheDocument();
  expect(adresses[0]).toBeInTheDocument();
  expect(usernames[0]).toBeInTheDocument();
  expect(email[0]).toBeInTheDocument();
  expect(balance).toBeInTheDocument();
});

test("clicking edit button calls the correct function", async () => {
  const data = {
    id: 1,
    surname: "John",
    lastname: "Doe",
    address: "Gymnastikgatan 55 632 20 Eskilstuna",
    "billing-adress": "Gymnastikgatan 55 632 20 Eskilstuna",
    username: "john1@somemail.com",
    pass: "",
    email: "john@somemail.com",
    balance: 1000,
    status: "online",
    klarna: 0,
  };

  const handleClickEditButton = jest.fn();

  render(
    <UserCard content={data} handleClickEditButton={handleClickEditButton} />
  );

  const button = await screen.findByText("Ändra uppgifter");
  const user = userEvent.setup();
  await user.click(button);

  expect(handleClickEditButton).toHaveBeenCalledTimes(1);
});

test("clicking edit balance button calls the correct function", async () => {
  const data = {
    id: 1,
    surname: "John",
    lastname: "Doe",
    address: "Gymnastikgatan 55 632 20 Eskilstuna",
    "billing-adress": "Gymnastikgatan 55 632 20 Eskilstuna",
    username: "john1@somemail.com",
    pass: "",
    email: "john@somemail.com",
    balance: 1000,
    status: "online",
    klarna: 0,
  };

  const handleClickEditBalanceButton = jest.fn();

  render(
    <UserCard
      content={data}
      handleClickEditBalanceButton={handleClickEditBalanceButton}
    />
  );

  const button = await screen.findByText("Fyll på saldo");
  const user = userEvent.setup();
  await user.click(button);

  expect(handleClickEditBalanceButton).toHaveBeenCalledTimes(1);
});

test("clicking edit payment service button calls the correct function", async () => {
  const data = {
    id: 1,
    surname: "John",
    lastname: "Doe",
    address: "Gymnastikgatan 55 632 20 Eskilstuna",
    "billing-adress": "Gymnastikgatan 55 632 20 Eskilstuna",
    username: "john1@somemail.com",
    pass: "",
    email: "john@somemail.com",
    balance: 1000,
    status: "online",
    klarna: 1,
  };

  const handleClickEditPaymentServiceButton = jest.fn();

  render(
    <UserCard
      content={data}
      handleClickEditPaymentServiceButton={handleClickEditPaymentServiceButton}
    />
  );

  const button = await screen.findByText("Välj betaltjänst");
  const user = userEvent.setup();
  await user.click(button);

  expect(handleClickEditPaymentServiceButton).toHaveBeenCalledTimes(1);
});

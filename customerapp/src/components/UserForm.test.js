import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import UserForm from "./UserForm";

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

  const handleClickSaveButton = jest.fn();

  const handleClickCancelButton = jest.fn();

  render(
    <UserForm
      content={data}
      handleClickSaveButton={handleClickSaveButton}
      handleClickCancelButton={handleClickCancelButton}
    />
  );

  const surname = await screen.findByDisplayValue("John");
  const lastname = await screen.findByDisplayValue("Doe");
  const adresses = await screen.findAllByDisplayValue(/Gymnastikgatan/i);
  const username = await screen.findByDisplayValue(/john1@somemail.com/i);
  const email = await screen.findByDisplayValue(/john1@somemail.com/i);
  const balance = await screen.findByDisplayValue("1000");

  expect(surname).toBeInTheDocument();
  expect(lastname).toBeInTheDocument();
  expect(adresses[0]).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(balance).toBeInTheDocument();
});

test("saving form calls the save function", async () => {
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

  const handleClickSaveButton = jest.fn();

  const handleClickCancelButton = jest.fn();

  render(
    <UserForm
      content={data}
      handleClickSaveButton={handleClickSaveButton}
      handleClickCancelButton={handleClickCancelButton}
    />
  );

  const user = userEvent.setup();

  const surname = await screen.findByDisplayValue("John");

  await user.type(surname, "Johnny");

  const save = await screen.findByText("Spara");

  await user.click(save);

  expect(handleClickSaveButton).toHaveBeenCalledTimes(1);
});

test("clicking cancel calls the cancel function", async () => {
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

  const handleClickSaveButton = jest.fn();

  const handleClickCancelButton = jest.fn();

  render(
    <UserForm
      content={data}
      handleClickSaveButton={handleClickSaveButton}
      handleClickCancelButton={handleClickCancelButton}
    />
  );

  const cancel = await screen.findByText("Avbryt");
  const user = userEvent.setup();

  await user.click(cancel);

  expect(handleClickCancelButton).toHaveBeenCalledTimes(1);
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import PaymentServiceForm from "./PaymentServiceForm";

test("renders", async () => {
  const handleClickSaveButton = jest.fn();

  const handleClickCancelButton = jest.fn();

  render(
    <PaymentServiceForm
      handleClickSaveButton={handleClickSaveButton}
      handleClickCancelButton={handleClickCancelButton}
    />
  );
});

test("saving form calls the save function", async () => {
  const handleClickSaveButton = jest.fn();

  const handleClickCancelButton = jest.fn();

  render(
    <PaymentServiceForm
      handleClickSaveButton={handleClickSaveButton}
      handleClickCancelButton={handleClickCancelButton}
    />
  );

  const user = userEvent.setup();

  const klarna = await screen.findByLabelText(/Klarna/i);

  await user.click(klarna);

  const save = await screen.findByText("Spara");

  await user.click(save);

  expect(handleClickSaveButton).toHaveBeenCalledTimes(1);
});

test("clicking cancel calls the cancel function", async () => {
  const handleClickSaveButton = jest.fn();

  const handleClickCancelButton = jest.fn();

  render(
    <PaymentServiceForm
      handleClickSaveButton={handleClickSaveButton}
      handleClickCancelButton={handleClickCancelButton}
    />
  );

  const cancel = await screen.findByText("Avbryt");
  const user = userEvent.setup();

  await user.click(cancel);

  expect(handleClickCancelButton).toHaveBeenCalledTimes(1);
});

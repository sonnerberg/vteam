import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event/";
import getUserData from "./models/getUserData";
import getFeatures from "./models/getFeatures";

// Mock fetch to return a token
let originalFetch;
/*
beforeEach(() => {
  originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          message: "successful login",
          token: "1",
          user: "user",
        }),
    })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
}); */

/* beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      status: 200,
      message: "successful login",
      token: "1",
      user: "user",
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("login", async () => {
  getUserData.getUser = jest.fn();
  getUserData.getTripsByUserName = jest.fn();
  getFeatures.getCities = jest.fn();
  getFeatures.getChargingStations = jest.fn();
  getFeatures.getParkingLots = jest.fn();
  getFeatures.getBikes = jest.fn();
  getFeatures.getCities = jest.fn();

  render(<App />);
  const user = userEvent.setup();
  const login = await screen.findByText(/ta mig till github/i);
  await user.click(login);
  const account = await screen.findByText(/konto/i);
  await user.click(account);
  await screen.findByText(/uppgifter/i);
  screen.debug();
}); */

test("App renders", async () => {
  render(<App />);
  const login = await screen.findByText(/ta mig till github/i);
  expect(login).toBeInTheDocument();
});

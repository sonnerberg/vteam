import { render, screen } from "@testing-library/react";
import TripAccordion from "./TripAccordion";
import TripCard from "./TripCard";
import TripContainer from "./TripContainer";
import userEvent from "@testing-library/user-event/";

test("renders", async () => {
  const trip = {
    id: 3782,
    startposition: {
      type: "Point",
      coordinates: [16.425240703033822, 59.35355658576016],
    },
    endposition: {
      type: "Point",
    },
    starttime: "2022-12-30T11:33:49.000Z",
    endtime: null,
    username: "Joel80",
    cost: null,
  };
  const card = <TripCard content={trip} />;

  const accordion = (
    <TripAccordion
      title={new Date(trip.starttime).toLocaleString()}
      card={card}
    />
  );

  render(<TripContainer trips={[trip]} />);

  const time = await screen.findAllByText(/12:33:49/i);

  expect(time[0]).toBeInTheDocument();
});

test("clicking accordion displays card", async () => {
  const trip = {
    id: 3782,
    startposition: {
      type: "Point",
      coordinates: [16.425240703033822, 59.35355658576016],
    },
    endposition: {
      type: "Point",
    },
    starttime: "2022-12-30T11:33:49.000Z",
    endtime: null,
    username: "Joel80",
    cost: null,
  };
  const card = <TripCard content={trip} />;

  const accordion = (
    <TripAccordion
      title={new Date(trip.starttime).toLocaleString()}
      card={card}
    />
  );

  const user = userEvent.setup();

  render(<TripContainer trips={[trip]} />);

  const time = await screen.findAllByText(/12:33:49/i);

  await user.click(time[0]);

  const start = await screen.findByText(/startposition/i);

  expect(start).toBeInTheDocument();
});

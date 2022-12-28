import TripCard from "./TripCard";
import TripAccordion from "./TripAccordion";
import { Container } from "@mui/material";
//import LayerButton from './LayerButton';
const TripContainer = (props) => {
  const cards = props.trips?.map((trip, index) => (
    <TripCard key={index} content={trip} />
  ));
  return (
    <Container sx={{ mb: 8, fontSize: 22 }}>
      Dina resor
      {cards ? (
        cards.map((card, index) => (
          <TripAccordion
            key={index}
            card={card}
            title={new Date(props.trips[index].starttime).toLocaleString()}
          />
        ))
      ) : (
        <></>
      )}
    </Container>
  );
};

export default TripContainer;

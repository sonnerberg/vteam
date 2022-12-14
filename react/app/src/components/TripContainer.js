import { Container } from '@mui/material';
import TripCard from './TripCard';
import TripAccordion from './TripAccordion';
//import LayerButton from './LayerButton';
const TripContainer = (props) => {
    const cards = props.trips?.map((trip, index) => (
        <TripCard key={index} content={trip} />
    ));
    return (
        <>
            {cards.map((card, index) => (
                <TripAccordion
                    key={index}
                    card={card}
                    title={new Date(
                        props.trips[index].starttime
                    ).toLocaleString()}
                />
            ))}
        </>
    );
};

export default TripContainer;

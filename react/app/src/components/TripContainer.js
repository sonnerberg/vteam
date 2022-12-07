import { Container } from '@mui/material';
import TripCard from './TripCard';
const TripContainer = (props) => {
    console.log('trips in container', props.trips);

    /*  */

    return (
        <>
            {props.trips?.map((trip, index) => (
                <TripCard key={index} content={trip} />
            ))}
        </>
    );
};

export default TripContainer;

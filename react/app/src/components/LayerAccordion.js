import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import eventBus from '../models/eventBus';
import { useEffect, useState } from 'react';
import LayerCard from './LayerCard';
import LayerButton from './LayerButton';

/**
 *
 * @param {object} props - Props for the function
 * @param {string} props.title - Title to display on the accordion
 * @param {React.ReactElement} card - Card with info
 * @returns {React.ReactElement} - The accordion
 */
const LayerAccordion = (props) => {
    const [card, setCard] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        eventBus.on(props.event, (data) => {
            const editButton = (
                <LayerButton buttonText={'Ändra'} size={'small'} width={25} />
            );
            const newCard = <LayerCard content={data} button={editButton} />
            setCard(newCard);
            setExpanded(true);
        });

        return eventBus.remove(props.event);
    }, [])

    return (
        <div>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {card ? <div>{card}</div> : <></>}
                </AccordionDetails>
            </Accordion>
        </div>
    );

};

export default LayerAccordion;

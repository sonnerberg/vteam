import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import eventBus from '../models/eventBus';
import { useEffect, useState, useRef } from 'react';
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
    const initialProps = useRef(props);

    const [ accordion, setAccordion] = useState (
        <div>
            <Accordion expanded={props.expanded}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>{props.card}</div>
                </AccordionDetails>
            </Accordion>
        </div>
    )

    useEffect(() => {
        eventBus.on(props.event, (data) => {
            const editButton = (
                <LayerButton buttonText={'Ändra'} size={'small'} width={25} />
            );
            const card = <LayerCard content={data} button={editButton} />
            const newAccordion = (
                <div>
                    <Accordion expanded={true}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{initialProps.current.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>{card}</div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            );

            setAccordion(newAccordion);
        });

        return eventBus.remove(props.event);
    }, [])

    return (
        accordion
    );

};

export default LayerAccordion;

import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import eventBus from '../models/eventBus';
import { useEffect, useState, useRef } from 'react';
import LayerCard from './LayerCard';
import LayerButton from './LayerButton';
import LayerFormCard from './LayerFormCard';
import createAccordionUtils from '../models/layerAccordionUtils';
import L from 'leaflet';

/**
 *
 * @param {object} props - Props for the function
 * @param {string} props.title - Title to display on the accordion
 * @param {React.ReactElement} card - Card with info
 * @returns {React.ReactElement} - The accordion
 */
const LayerAccordion = (props) => {
    const [card, setCard] = useState(null);
    const [formCard, setFormCard] = useState(null);
    const [showFormCard, setShowFormCard] = useState(false);
    const [expanded, setExpanded] = useState(false);

    console.log('formcard', formCard);
    console.log('layer accordion props', props);

    console.log('showform', showFormCard);

    const utils = createAccordionUtils({
        setShowFormCard: setShowFormCard,
        setActivateDraw: props.setActivateDraw,
        drawnItems: props.drawnItems,
        geometry: props,
    });

    const handleChange = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        console.log('Running useEffect in accoridion');
        eventBus.on(props.event, (data) => {
            console.log('data in useeffect', data);
            if (data) {
                const handleClickChangeButton = () => {
                    /* console.log('Ändra');
                    console.log('showforminclick', showFormCard); */
                    setShowFormCard(true);
                    props.setActivateDraw(true);
                    console.log('GEOMETRY IN CLICK', data.position.geometry);
                    console.log('props.drawnItems', props.drawnItems);
                    console.log('props.drawnItems before', props.drawnItems);

                    props.drawnItems.addLayer(
                        L.GeoJSON.geometryToLayer(data.position)
                    );
                    console.log('props.drawnItems after', props.drawnItems);
                };

                const editButton = (
                    <LayerButton
                        buttonText={'Ändra'}
                        size={'small'}
                        width={25}
                        handleClick={handleClickChangeButton}
                    />
                );
                const newCard = (
                    <LayerCard content={data} button={editButton} />
                );
                const newFormCard = (
                    <LayerFormCard
                        content={data}
                        setShowFormCard={setShowFormCard}
                        cancelButton={utils.cancelButton}
                        saveButton={utils.saveButton}
                        deleteButton={utils.deleteButton}
                        drawnItems={props.drawnItems}
                        triggerRedraw={props.triggerRedraw}
                        setTriggerRedraw={props.setTriggerRedraw}
                    />
                );
                setCard(newCard);
                setFormCard(newFormCard);
                setExpanded(true);
            }
        });

        return eventBus.remove(props.event);
    }, []);

    return (
        <div>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {(() => {
                        if (card) {
                            if (showFormCard) {
                                return formCard;
                            }

                            return card;
                        }
                    })()}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default LayerAccordion;

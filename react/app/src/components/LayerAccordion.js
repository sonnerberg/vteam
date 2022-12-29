import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import eventBus from '../models/eventBus';
import { useEffect, useState } from 'react';
import LayerButton from './LayerButton';
import LayerCard from './LayerCard';
import LayerFormCard from './LayerFormCard';
import LayerNewFormCard from './LayerNewFormCard';
import createAccordionUtils from '../models/layerAccordionUtils';
import layerAttributes from '../models/layerAttributes';
import L from 'leaflet';
import postFeatures from '../models/postFeatures';

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
        //man vill hantera alla eventuellt redan öppande accordions också, om man klickar på flera...

        if (props.triggerNewObject && props.dad === props.newObjectContainer) {
            setExpanded(true);
            //attributen är hårdkodade i layerAttributes. ändra där om datamodellen ändras!!
            const dataNew = {
                data: '',
                position: layerAttributes[props.dad].position,
            };
            //const newCard2 = <LayerCard content={dataNew} />;
            const newFormCard = (
                <LayerNewFormCard
                    content={dataNew}
                    setShowFormCard={setShowFormCard}
                    setCard={setCard}
                    cancelButton={utils.cancelButton}
                    drawnItems={props.drawnItems}
                    triggerRedraw={props.triggerRedraw}
                    setTriggerRedraw={props.setTriggerRedraw}
                />
            );
            setCard(newFormCard);
            //har inte riktigt fattat skillnaden mellan card och formcard
            //eller jo det har jag men tänker det räcker med att setcard här, men trycka in formcard?!
            //setFormCard(newFormCard);

            props.setTriggerNewObject(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.triggerNewObject]);

    useEffect(() => {
        eventBus.on(props.event, (data) => {
            if (data) {
                const handleClickChangeButton = () => {
                    setShowFormCard(true);
                    props.setActivateDraw(true);

                    props.drawnItems.current.addLayer(
                        L.GeoJSON.geometryToLayer(data.position)
                    );
                };

                const handleClickStopBikeButton = async () => {
                    //setShowFormCard(true);
                    //props.setActivateDraw(true);
                    console.log('TOKEN ', props.token);
                    const stopBike = await postFeatures.postToStopBike(
                        props.token,
                        data.position.username
                    );

                    console.log('STOPBIKE', stopBike);
                };

                const editButton = (
                    <LayerButton
                        buttonText={'Ändra'}
                        size={'small'}
                        width={25}
                        handleClick={handleClickChangeButton}
                    />
                );

                const stopBikeButton = (
                    <LayerButton
                        buttonText={'Stoppa cykeln'}
                        size={'small'}
                        width={25}
                        handleClick={handleClickStopBikeButton}
                    />
                );
                const newCard = (
                    <LayerCard
                        content={data}
                        button={
                            props.dad === 'scooter'
                                ? [editButton, stopBikeButton]
                                : [editButton]
                        }
                    />
                );
                const newFormCard = (
                    <LayerFormCard
                        content={data}
                        setShowFormCard={setShowFormCard}
                        setCard={setCard}
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

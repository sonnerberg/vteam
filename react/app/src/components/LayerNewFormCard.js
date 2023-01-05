import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { useState } from 'react';
import postFeatures from '../models/postFeatures';
import LayerButton from '../components/LayerButton';
import LayerCard from '../components/LayerCard';

/**
 * A form for editing feature properties
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The form
 */
const LayerNewFormCard = (props) => {
    const rows = [];

    const [newFeatureObject, setNewFeatureObject] = useState(props.content);

    console.log(newFeatureObject);

    // If not using optional chaining here, there is an
    // error Uncaught TypeError: props.content.position is undefined
    // when loading the app and it crashes. When inspecting  props.content
    // it looks like it contains an object with {id: 1, name:Eskilstuna}
    // I don't know where that comes from, its strange.
    for (const property in props.content.position?.properties) {
        if (property !== 'featureType' && property !== 'id') {
            rows.push({
                name: property,
                value: props.content.position.properties[property],
            });
        }
    }

    const handleClickSaveButton = async () => {
        console.log(props.dad);
        if (props.dad !== 'scooter') {
            const newGeoJson =
                props.drawnItems.current.toGeoJSON().features[0].geometry;

            await postFeatures.postFeatures(
                {
                    ...newFeatureObject,
                    position: {
                        ...newFeatureObject.position,
                        geometry: newGeoJson,
                    },
                },
                props.token
            );
            props.setShowFormCard(false);
            props.setCard(<LayerCard content={newFeatureObject} />);
            props.setTriggerRedraw(true);
            props.drawnItems.current.clearLayers();

            return;
        }

        // Create new scooters
        await postFeatures.postBatchOfBikes(
            newFeatureObject.position.properties.number,

            props.token
        );

        props.setShowFormCard(false);
        props.setCard(null);
        /* props.setTriggerRedraw(true);
        props.drawnItems.current.clearLayers(); */
    };

    const handleClickDeleteButton = async () => {
        props.setShowFormCard(false);
        props.setCard(null);
    };

    const handleClickCancelButton = () => {
        props.setCard(false);
    };

    const saveButton = (
        <LayerButton
            buttonText={'Spara'}
            size={'small'}
            width={25}
            handleClick={handleClickSaveButton}
        />
    );

    const deleteButton = (
        <LayerButton
            buttonText={'Ta bort'}
            size={'small'}
            width={25}
            handleClick={handleClickDeleteButton}
        />
    );

    const cancelButton = (
        <LayerButton
            buttonText={'Avbryt'}
            size={'small'}
            width={25}
            handleClick={handleClickCancelButton}
        />
    );

    function changeHandler(event) {
        let newObject = { ...newFeatureObject };

        newObject.position.properties[event.target.name] = event.target.value;

        setNewFeatureObject({ ...newFeatureObject, ...newObject });
    }

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                {rows.map((row) => (
                    <TextField
                        disabled={row.name === 'id' ? true : false}
                        variant="outlined"
                        key={row.name}
                        label={row.name}
                        name={row.name}
                        defaultValue={row.value}
                        onChange={changeHandler}
                        sx={{ m: 1 }}
                    />
                ))}
            </CardContent>
            <CardActions>
                <div>{cancelButton}</div>
                <div>{saveButton}</div>
                {/* <div>{deleteButton}</div> */}
            </CardActions>
        </Card>
    );
};

export default LayerNewFormCard;

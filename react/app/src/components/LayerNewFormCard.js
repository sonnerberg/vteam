import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { useState } from 'react';
import postFeatures from '../models/postFeatures';
import deleteFeatures from '../models/deleteFeatures';
import LayerButton from '../components/LayerButton';

/**
 * A form for editing feature properties
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The form
 */
const LayerNewFormCard = (props) => {
    const rows = [];

    const [newFeatureObject, setNewFeatureObject] = useState(props.content);

    console.log('NEWFORMCARDcontent', props.content);
    console.log('NEEEEEEEEEEEEEEEEEEEEEEEEEEEEWFORMCARD props', props);

    // If not using optional chaining here, there is an
    // error Uncaught TypeError: props.content.position is undefined
    // when loading the app and it crashes. When inspecting  props.content
    // it looks like it contains an object with {id: 1, name:Eskilstuna}
    // I don't know where that comes from, its strange.
    for (const property in props.content.position?.properties) {
        if (property !== 'featureType') {
            rows.push({
                name: property,
                value: props.content.position.properties[property],
            });
        }
    }

    const handleClickSaveButton = async () => {
        //const layer = props.drawnItems.getLayers([0]);
        console.log('PROPS IN LAYERNEWWWWWWWWWWWWWWWWWWWBUTTON', props);
        const newGeoJson =
            props.drawnItems.current.toGeoJSON().features[0].geometry;
        console.log({
            ...newFeatureObject,
            position: {
                ...newFeatureObject.position,
                geometry: newGeoJson,
            },
        });
        const result = await postFeatures.postFeatures({
            ...newFeatureObject,
            position: {
                ...newFeatureObject.position,
                geometry: newGeoJson,
            },
        });
        props.setShowFormCard(false);
        props.setTriggerRedraw(true);
        props.drawnItems.current.clearLayers();
        console.log(result);
    };

    const handleClickDeleteButton = async () => {
        //const result = await deleteFeatures.deleteFeatures(newFeatureObject);
        props.setShowFormCard(false);
        props.setCard(null);
        //console.log(result);
    };

    const handleClickCancelButton = () => {
        /* console.log('Cancel');
        console.log('showformincancel', showFormCard); */
        props.setCard(false);
        // props.setActivateDraw(false);
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

        console.log('THIS IS NEW OBJECT', newObject);
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
                <div>{deleteButton}</div>
            </CardActions>
        </Card>
    );
};

export default LayerNewFormCard;

import './App_layerstack.css';
import { useEffect, useState, useRef } from 'react';
import LayerStack from './components/LayerStack';
import LayerAccordion from './components/LayerAccordion';
import LayerButton from './components/LayerButton';
import LayerButtonGroup from './components/LayerButtonGroup';
import LayerContainer from './components/LayerContainer';
import LayerSwitch from './components/LayerSwitch';
import LayerCard from './components/LayerCard';
import LayerGrid from './components/LayerGrid';
import Map from './components/Map';
import layerStackBuilder from './models/layerStackModel';

function App() {
    const [showCities, setShowCities] = useState(false);
    const [showParkings, setShowParkings] = useState(false);
    const [showChargingStations, setShowChargingStations] = useState(false);
    const [showZones, setShowZones] = useState(false);
    const [showBikes, setShowBikes] = useState(false);
    const [clickedMapObject, setClickedMapObject] = useState(null);
    const [containerArray, setContainerArray] = useState(null);

    const city = {
        id: 1,
        name: 'Eskilstuna',
        bla: 'Bla',
        position: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [59.4128, 16.4246],
                        [59.4308, 16.4747],
                        [59.376, 16.5876],
                        [59.3138, 16.4743],
                        [59.4128, 16.4246],
                    ],
                ],
            },
            properties: {
                prop0: 'value0',
                prop1: { this: 'that' },
                type: 'Städer',
            },
        },
    };

    useEffect(() => {
        const props = {
            showCities: showCities,
            showParkings: showParkings,
            showChargingStations: showChargingStations,
            showZones: showZones,
            showBikes: showBikes,
            setShowCities: setShowCities,
            setShowParkings: setShowParkings,
            setShowChargingStations: setShowChargingStations,
            setShowZones: setShowZones,
            setShowBikes: setShowBikes,
        };

        const containerArray = layerStackBuilder(props);

        setContainerArray(containerArray);
    }, []);

    const MapButton = (props) => {
        console.log(`The object prop name is ${props.object.name}`);
        function setClickedObject() {
            console.log(props.object.name);
            setClickedMapObject(props.object);
        }

        return (
            <div object={props.object}>
                <button onClick={setClickedObject}>Eskilstuna</button>
            </div>
        );
    };

    useEffect(() => {
        function createAccordionObject(mapObject) {
            if (mapObject) {
                const cardButton = <LayerButton buttonText={'Edit'} />;
                const card = (
                    <LayerCard content={mapObject} button={cardButton} />
                );
                const accordion = (
                    <LayerAccordion
                        title={mapObject.position.properties.type}
                        expanded={true}
                        card={card}
                    />
                );

                return {
                    type: mapObject.position.properties.type,
                    accordion: accordion,
                };
            }
        }

        if (containerArray) {
            const newContainerArray = [...containerArray];
            console.log(`Clicked map object: ${clickedMapObject}`);
            const accordionObject = createAccordionObject(clickedMapObject);
            console.log(accordionObject);

            console.log(newContainerArray[0]);

            switch (accordionObject.type) {
                case 'Städer':
                    const showCitiesSwitch = (
                        <LayerSwitch
                            setShowLayer={setShowCities}
                            showLayer={showCities}
                            checked={showCities}
                        />
                    );
                    const editButton = (
                        <LayerButton
                            buttonText={'Ny'}
                            size={'small'}
                            width={25}
                        />
                    );

                    const searchButton = (
                        <LayerButton
                            buttonText={'Sök'}
                            size={'small'}
                            width={25}
                        />
                    );

                    const buttonGroup = (
                        <LayerButtonGroup
                            buttons={[editButton, searchButton]}
                        />
                    );
                    newContainerArray[0] = (
                        <LayerGrid
                            title={'Städer'}
                            switch={showCitiesSwitch}
                            accordion={accordionObject.accordion}
                            buttonGroup={buttonGroup}
                        />
                    );
                    break;
                case 'Parkeringar':
                    newContainerArray[1].accordion = accordionObject.accordion;
                    break;
                case 'Laddstationer':
                    newContainerArray[2].accordion = accordionObject.accordion;
                    break;
                case 'Zoner':
                    newContainerArray[3].accordion = accordionObject.accordion;
                    break;
                case 'Cyklar':
                    newContainerArray[4].accordion = accordionObject.accordion;
                    break;
                default:
                    break;
            }

            setContainerArray(newContainerArray);
        }
    }, [clickedMapObject]);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-left">
                    <LayerStack components={containerArray} />
                    <MapButton object={city} />
                </div>
                <div className="App-right">
                    <Map />
                </div>
            </header>
        </div>
    );
}

export default App;

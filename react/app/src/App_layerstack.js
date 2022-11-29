import './App_layerstack.css';
import { useState } from 'react';
import LayerStack from './components/LayerStack';
import LayerAccordion from './components/LayerAccordion';
import LayerButton from './components/LayerButton';
import LayerButtonGroup from './components/LayerButtonGroup';
import LayerContainer from './components/LayerContainer';
import LayerSwitch from  './components/LayerSwitch';
import LayerCard from './components/LayerCard';
import LayerGrid from './components/LayerGrid';
import Map from './components/Map';

function App() {
    const [showCities, setShowCities] = useState(false);
    const [showParkings, setShowParkings] = useState(false);
    const [showChargingStations, setShowChargingStations] = useState(false);
    const [showZones, setShowZones] = useState(false);
    const [showBikes, setShowBikes] = useState(false);

    console.log(showCities);

   const city = {
        "id": 1,
        "name": "Eskilstuna",
        "bla": "Bla",
        "position": {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [59.4128,16.4246], [59.4308,16.4747], [59.3760,16.5876],
              [59.3138,16.4743], [59.4128,16.4246]
            ]
          ]
        },
        "properties": {
          "prop0": "value0",
          "prop1": { "this": "that" }
        }
      }
    }

    const cardButton = <LayerButton buttonText={"Edit"} />
    const card = <LayerCard content={city} button={cardButton}/>
    const cityAccordion = <LayerAccordion title={"Eskilstuna"} expanded={true} card={card}/>
    const parkingAccordion = <LayerAccordion title={"Parkeringar"} />
    const chargingAccordion = <LayerAccordion title={"Laddstationer"} />
    const zoneAccordion = <LayerAccordion title={"Zoner"} />
    const bikeAccordion = <LayerAccordion title={"Cyklar"} />
    const showCitiesSwitch = <LayerSwitch setShowLayer={setShowCities} showLayer={showCities} />
    const showParkingsSwitch = <LayerSwitch setShowLayer={setShowParkings} showLayer={showParkings} />
    const showChargingStationsSwitch = <LayerSwitch setShowLayer={setShowChargingStations} showLayer={showChargingStations} />
    const showZonesSwitch = <LayerSwitch setShowLayer={setShowZones} showLayer={showZones} />
    const showBikesSwitch = <LayerSwitch setShowLayer={setShowBikes} showLayer={showBikes} />
    const editButton = <LayerButton buttonText={"Ny"} size={"small"} width={25} />
    const searchButton = <LayerButton buttonText={"Sök"} size={"small"} width={25} />
    const buttonGroup = <LayerButtonGroup buttons={[editButton, searchButton]} />


    const container = <LayerGrid title={"Städer"} switch={showCitiesSwitch} accordion={cityAccordion} buttonGroup={buttonGroup}/>
    const container2 = <LayerGrid title={"Parkering"} switch={showParkingsSwitch} accordion={parkingAccordion} buttonGroup={buttonGroup}/>
    const container3 = <LayerGrid title={"Ladd"} switch={showChargingStationsSwitch} accordion={chargingAccordion} buttonGroup={buttonGroup}/>
    const container4 = <LayerGrid title={"Zoner"} switch={showZonesSwitch} accordion={zoneAccordion} buttonGroup={buttonGroup}/>
    const container5 = <LayerGrid title={"Cyklar"} switch={showBikesSwitch} accordion={bikeAccordion} buttonGroup={buttonGroup}/>
    const containerArray = [container, container2, container3, container4, container5];


    return (
    <div className="App">
        <header className="App-header">
          <div className="App-left">
            <LayerStack components={containerArray}/>
          </div>
          <div className="App-right">
              <Map />
          </div>
        </header>
    </div>
    );
    }

export default App;

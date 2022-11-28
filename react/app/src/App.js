import './App.css';
import LayerStack from './components/LayerStack';
import LayerAccordion from './components/LayerAccordion';
import LayerButton from './components/LayerButton';
import LayerButtonGroup from './components/LayerButtonGroup';
import LayerContainer from './components/LayerContainer';
import LayerSwitch from  './components/LayerSwitch';
import LayerCard from './components/LayerCard';
import LayerGrid from './components/LayerGrid';

function App() {
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
    const accordion = <LayerAccordion title={"Eskilstuna"} card={card}/>
    const layerSwitch = <LayerSwitch />
    const editButton = <LayerButton buttonText={"Ny"} size={"small"} />
    const searchButton = <LayerButton buttonText={"Sök"} size={"small"}/>
    const buttonGroup = <LayerButtonGroup buttons={[editButton, searchButton]} />
    const container = <LayerGrid switch={layerSwitch} accordion={accordion} buttonGroup={buttonGroup}/>
    /* const container = <LayerContainer grid={grid} />
 */
    const containerArray = [container];


    return (
    <div className="App">
        <header className="App-header">
        {/* <LayerButtonGroup buttons={[editButton, searchButton]} /> */}
        <LayerStack components={containerArray}/>
        {/* <LayerButton buttonText={"Search"} />
        <LayerButton buttonText={"Click me"} />
        <LayerButton buttonText={"Edit"} />
        <LayerCard content={"Bike1"} button={cardButton}/>
        <LayerAccordion title={"Cities"} card={card}/> */}
        </header>
    </div>
    );
    }

export default App;

import './App_layerstack.css';
import { useEffect, useState } from 'react';
import LayerStack from './components/LayerStack';
import Map from './components/Map';
import layerStackBuilder from './models/layerStackModel';
import LayerFormCard from './components/LayerFormCard';
import { Layer } from 'leaflet';

function App() {
    const [showCities, setShowCities] = useState(true);
    const [showParkings, setShowParkings] = useState(true);
    const [showChargingStations, setShowChargingStations] = useState(true);
    const [showZones, setShowZones] = useState(true);
    const [showBikes, setShowBikes] = useState(true);
    const [containerArray, setContainerArray] = useState(null);
    const [activateDraw, setActivateDraw] = useState(false);

    console.log('activate draw', activateDraw);

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
            setActivateDraw: setActivateDraw,
        };

        const containerArray = layerStackBuilder(props);

        setContainerArray(containerArray);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-left">
                    <LayerStack
                        components={containerArray}
                        setActivateDraw={setActivateDraw}
                    />
                </div>
                <div className="App-right">
                    <Map
                        showCities={showCities}
                        showParkings={showParkings}
                        showChargingStations={showChargingStations}
                        showZones={showZones}
                        showBikes={showBikes}
                        activateDraw={activateDraw}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;

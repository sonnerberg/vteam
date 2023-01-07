import './App_layerstack.css';
import { useEffect, useState, useRef } from 'react';
import LayerStack from './components/LayerStack';
import SearchBikeForm from './components/SearchBikeForm';
import SearchCityForm from './components/SearchCityForm';
import SearchChargingForm from './components/SearchChargingForm';
import SearchZoneForm from './components/SearchZoneForm';
import SearchParkingForm from './components/SearchParkingForm';
import Map from './components/Map';
import layerStackBuilder from './models/layerStackModel';
//import LayerFormCard from './components/LayerFormCard';
//import { Layer } from 'leaflet';
import mapStyles from './models/mapStyles';

import allLayers from './models/allLayers';
import getFeatures from './models/getFeatures';

import L from 'leaflet';

function AppMap(props) {
    const [showCities, setShowCities] = useState(true);
    const [showParkings, setShowParkings] = useState(true);
    const [showChargingStations, setShowChargingStations] = useState(true);
    const [showZones, setShowZones] = useState(true);
    const [showBikes, setShowBikes] = useState(true);
    const [containerArray, setContainerArray] = useState(null);
    const [activateDraw, setActivateDraw] = useState(false);
    const drawnItems = useRef(new L.FeatureGroup());
    const dataFromBackend = {};
    const [triggerCityRedraw, setTriggerCityRedraw] = useState(false);
    const [triggerParkingRedraw, setTriggerParkingRedraw] = useState(false);
    const [triggerZoneRedraw, setTriggerZoneRedraw] = useState(false);
    const [triggerChargeRedraw, setTriggerChargeRedraw] = useState(false);
    const [triggerNewObject, setTriggerNewObject] = useState(false);
    const [newObjectContainer, setNewObjectContainer] = useState(null);
    const [openSearchForm, setOpenSearchForm] = useState(false);
    const [searchForFeature, setSearchForFeature] = useState('');
    const mapRef = useRef(null);
    const token = props.token;

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
            drawnItems: drawnItems,
            triggerCityRedraw: triggerCityRedraw,
            setTriggerCityRedraw: setTriggerCityRedraw,
            setTriggerParkingRedraw: setTriggerParkingRedraw,
            triggerParkingRedraw: triggerParkingRedraw,
            setTriggerZoneRedraw: setTriggerZoneRedraw,
            triggerZoneRedraw: triggerZoneRedraw,
            setTriggerChargeRedraw: setTriggerChargeRedraw,
            triggerChargeRedraw: triggerChargeRedraw,
            triggerNewObject: triggerNewObject,
            setTriggerNewObject: setTriggerNewObject,
            newObjectContainer: newObjectContainer,
            setNewObjectContainer: setNewObjectContainer,
            openSearchForm: openSearchForm,
            setOpenSearchForm: setOpenSearchForm,
            searchForFeature: searchForFeature,
            setSearchForFeature: setSearchForFeature,
            token: token,
        };

        const containerArray = layerStackBuilder(props);

        setContainerArray(containerArray);
    }, [
        triggerNewObject,
        newObjectContainer,
        showBikes,
        showChargingStations,
        showCities,
        showParkings,
        showZones,
        triggerChargeRedraw,
        triggerCityRedraw,
        triggerParkingRedraw,
        triggerZoneRedraw,
    ]);

    useEffect(() => {
        (async () => {
            dataFromBackend.cities = await getFeatures.getCities(props.token);

            for (const city of dataFromBackend.cities) {
                allLayers.cities.addLayer(
                    L.geoJson(city.position, {
                        style: mapStyles.city,
                    })
                );
            }
        })();

        setTriggerCityRedraw(false);

        return () => allLayers.cities.clearLayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerCityRedraw]);
    useEffect(() => {
        (async () => {
            dataFromBackend.chargingStations =
                await getFeatures.getChargingStations(props.token);

            for (const charger of dataFromBackend.chargingStations) {
                const polygon = L.polygon(
                    charger.position.geometry.coordinates
                );

                const center = polygon.getBounds().getCenter();

                // Why do we have to switch lat and lng around?
                const center2 = {
                    lat: center.lng,
                    lng: center.lat,
                };

                const marker = L.marker(center2, mapStyles['charger']);
                marker.position = charger.position;
                allLayers.chargingStations.addLayer(marker);
            }
        })();
        setTriggerChargeRedraw(false);

        return () => allLayers.chargingStations.clearLayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerChargeRedraw]);
    useEffect(() => {
        (async () => {
            dataFromBackend.parkingLots = await getFeatures.getParkingLots(
                props.token
            );

            for (const parking of dataFromBackend.parkingLots) {
                allLayers.parkingLots.addLayer(
                    L.geoJson(parking.position, {
                        style: mapStyles.parking,
                    })
                );
            }
        })();
        setTriggerParkingRedraw(false);

        return () => allLayers.parkingLots.clearLayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerParkingRedraw]);
    useEffect(() => {
        (async () => {
            dataFromBackend.bikes = await getFeatures.getBikes(props.token);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.workshops = await getFeatures.getWorkshops(
                props.token
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.zones = await getFeatures.getZones(props.token);

            for (const zone of dataFromBackend.zones) {
                allLayers.zones.addLayer(
                    L.geoJson(zone.position, {
                        style: mapStyles.zone,
                    })
                );
            }
        })();
        setTriggerZoneRedraw(false);

        return () => allLayers.zones.clearLayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerZoneRedraw]);

    return (
        <div className="AppMap">
            <div className="App-header-Map">
                <div className="App-left-Map">
                    <LayerStack
                        components={containerArray}
                        setActivateDraw={setActivateDraw}
                        drawnItems={drawnItems}
                        triggerCityRedraw={triggerCityRedraw}
                        setTriggerCityRedraw={setTriggerCityRedraw}
                    />
                    {openSearchForm && searchForFeature === 'scooter' ? (
                        <SearchBikeForm
                            openSearchForm={openSearchForm}
                            setOpenSearchForm={setOpenSearchForm}
                            token={props.token}
                            mapRef={mapRef}
                        />
                    ) : openSearchForm && searchForFeature === 'stad' ? (
                        <SearchCityForm
                            openSearchForm={openSearchForm}
                            setOpenSearchForm={setOpenSearchForm}
                            token={props.token}
                            mapRef={mapRef}
                        />
                    ) : openSearchForm && searchForFeature === 'parkering' ? (
                        <SearchParkingForm
                            openSearchForm={openSearchForm}
                            setOpenSearchForm={setOpenSearchForm}
                            token={props.token}
                            mapRef={mapRef}
                        />
                    ) : openSearchForm && searchForFeature === 'ladd' ? (
                        <SearchChargingForm
                            openSearchForm={openSearchForm}
                            setOpenSearchForm={setOpenSearchForm}
                            token={props.token}
                            mapRef={mapRef}
                        />
                    ) : openSearchForm && searchForFeature === 'zone' ? (
                        <SearchZoneForm
                            openSearchForm={openSearchForm}
                            setOpenSearchForm={setOpenSearchForm}
                            token={props.token}
                            mapRef={mapRef}
                        />
                    ) : null}
                </div>
                <div className="App-right-Map">
                    <Map
                        showCities={showCities}
                        showParkings={showParkings}
                        showChargingStations={showChargingStations}
                        showZones={showZones}
                        showBikes={showBikes}
                        activateDraw={activateDraw}
                        drawnItems={drawnItems}
                        dataFromBackend={dataFromBackend}
                        setTriggerNewObject={setTriggerNewObject}
                        token={props.token}
                        mapRef={mapRef}
                    />
                </div>
            </div>
        </div>
    );
}

export default AppMap;

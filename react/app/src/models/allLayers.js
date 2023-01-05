import L from 'leaflet';
import eventBus from './eventBus';

const allLayers = {
    //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
    //så här initierar vi helt enkelt alla featurgroups (= lager i kartan) och sätter gemensamma funktioner
    //på alla ingående objekt, som popup och click enligt nedan
    cities: L.featureGroup().on('click', function (event) {
        eventBus.dispatch('cityClicked', {
            id: event.propagatedFrom.feature.properties.id,
            position: event.propagatedFrom.feature,
        });
    }),
    chargingStations: L.featureGroup().on('click', function (event) {
        eventBus.dispatch('chargingStationClicked', {
            data: 'charging station',
            position: { properties: { featureType: 'chargingStations' } },
        });
    }),
    parkingLots: L.featureGroup().on('click', function (event) {
        eventBus.dispatch('parkingLotClicked', {
            id: event.propagatedFrom.feature.properties.id,
            position: event.propagatedFrom.feature,
        });
    }),
    bikes: L.featureGroup().on('click', function (event) {
        eventBus.dispatch('bikeClicked', {
            id: event.propagatedFrom.feature.properties.id,
            rented: event.propagatedFrom.feature.properties.rented
                ? event.propagatedFrom.feature.properties.rented
                : 'WHATEVER',
            position: event.propagatedFrom.feature,
        });
    }),
    workshops: L.featureGroup().on('click', function () {
        alert('Clicked on a member of the workshop group!');
    }),
    zones: L.featureGroup().on('click', function (event) {
        eventBus.dispatch('zoneClicked', {
            id: event.propagatedFrom.feature.properties.id,
            position: event.propagatedFrom.feature,
        });
    }),
};

export default allLayers;

import L from 'leaflet';
import eventBus from './eventBus';

const allLayers = {
    //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
    //så här initierar vi helt enkelt alla featurgroups (= lager i kartan) och sätter gemensamma funktioner
    //på alla ingående objekt, som popup och click enligt nedan
    cities: L.featureGroup()
        .bindPopup('Hello from city!')
        .on('click', function (event) {
            console.log('Clicked city', event.propagatedFrom);
            console.log(event.propagatedFrom);
            eventBus.dispatch('cityClicked', {
                id: event.propagatedFrom.feature.properties.id,
                position: event.propagatedFrom.feature,
            });
        }),
    chargingStations: L.featureGroup().on('click', function (e) {
        eventBus.dispatch('chargingStationClicked', {
            id: e.propagatedFrom.backendId,
        });
        const allObjects = this.getLayers();
        allObjects.forEach((object) => console.log('OBJECT ', object));
        console.log('E TARGET', e.target);
        console.log('THIS', this);
        allObjects.forEach((object) =>
            alert('YOU CLICKED OBJECT ID ' + object.backendId)
        );
    }),
    parkingLots: L.featureGroup()
        .bindPopup('Hello from parkinglot!')
        .on('click', function (event) {
            console.log(event.propagatedFrom);
            alert('Clicked on a member of the parkinglot group!');
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
        });
    }),
    workshops: L.featureGroup()
        .bindPopup('Hello from workshop!')
        .on('click', function () {
            alert('Clicked on a member of the workshop group!');
        }),
    zones: L.featureGroup()
        .bindPopup('Hello from zones!')
        .on('click', function (event) {
            alert('Clicked on a member of the zones group!');
            eventBus.dispatch('zoneClicked', {
                id: event.propagatedFrom.feature.properties.id,
                position: event.propagatedFrom.feature,
            });
            console.log(event.propagatedFrom.feature.properties.type);
        }),
    points: L.featureGroup().on('click', function () {
        alert('Clicked on a member of the 1000 points group!');
    }),
};

export default allLayers;

import L from 'leaflet';

const allLayers = {
    //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
    //så här initierar vi helt enkelt alla featurgroups (= lager i kartan) och sätter gemensamma funktioner
    //på alla ingående objekt, som popup och click enligt nedan
    cities: L.featureGroup()
        .bindPopup('Hello from city!')
        .on('click', function () {
            alert('Clicked on a member of the city group!');
        }),
    chargingStations: L.featureGroup().on('click', function (e) {
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
        .on('click', function () {
            alert('Clicked on a member of the parkinglot group!');
        }),
    bikes: L.featureGroup().on('click', function (event) {
        alert(
            //event.layer is deprecated....but cant find alternative to simple and fast
            //retrieval of actual clicked object instead of featuregroup
            //other than attaching a listner to every object when its inserted
            //in the featuregroup but that seems insane with 1000 bikes
            `BIKE NO ${event.layer.backendId} IS IT RENTED? ${event.layer.rented}`
        );
    }),
    workshops: L.featureGroup()
        .bindPopup('Hello from workshop!')
        .on('click', function () {
            alert('Clicked on a member of the workshop group!');
        }),
    zones: L.featureGroup()
        .bindPopup('Hello from zones!')
        .on('click', function () {
            alert('Clicked on a member of the zones group!');
        }),
    points: L.featureGroup().on('click', function () {
        alert('Clicked on a member of the 1000 points group!');
    }),
};

export default allLayers;

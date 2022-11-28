import L from 'leaflet';

const allLayers = {
    //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
    //så här initierar vi helt enkelt alla featurgroups (= lager i kartan) och sätter gemensamma funktioner
    //på alla ingående objekt, som popup och click enligt nedan
    cities: L.featureGroup()
                .bindPopup('Hello from city!')
                .on('click', function() { alert('Clicked on a member of the city group!'); }),
    chargingStations: L.featureGroup()
        .on('click', function(e) {
          const allObjects = this.getLayers();
          allObjects.forEach(object => console.log("OBJECT ", object))
          console.log("E TARGET", e.target);
          console.log("THIS", this);
          allObjects.forEach(object => alert("YOU CLICKED OBJECT ID " + object.backendId))
        }),
    parkingLots: L.featureGroup()
        .bindPopup('Hello from parkinglot!')
        .on('click', function() { alert('Clicked on a member of the parkinglot group!'); }),
}

export default allLayers;

import L from 'leaflet';
const dummyData = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [16.4246,59.4128], [16.4747,59.4308], [16.5876,59.3760],
          [16.4743,59.3138], [16.4246,59.4128]
        ]
      ]
    },
    "properties": {
      "prop0": "value0",
      "prop1": { "this": "that" }
    }
  }
const allLayers = {
    //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
    cities: L.featureGroup()
                .bindPopup('Hello from city!')
                .on('click', function() { alert('Clicked on a member of the city group!'); }),
    chargingStations: L.featureGroup()
        .bindPopup('Hello from chargingstation!')
        .on('click', function() { alert('Clicked on a member of the chargingstation group!'); }),
    parkingLots: L.featureGroup()
        .bindPopup('Hello from parkinglot!')
        .on('click', function() { alert('Clicked on a member of the parkinglot group!'); }),
}

export default allLayers;

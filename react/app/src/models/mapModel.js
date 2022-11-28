import L from 'leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');


const mapModel =  {
/*
      cityLayer: L.geoJSON(cities, {
                  style: function (feature) {
                      return {color: feature.properties.color};
                  }
                  }).bindPopup(function (layer) {
                    return layer.feature.properties.description;
         }),*/

    tileLayer: L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
      // Define the styles that are to be passed to the map instance:
    mapStyles: {
        overflow: "hidden",
        width: "100%",
        height: "100vh"
      },

      mapParams: {
        center: [59.4128,16.4246],
        zoom: 10,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [],
        //drawControl: true
      },

    }

    export default mapModel;

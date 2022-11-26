import L from 'leaflet';
require('../../node_modules/leaflet/dist/leaflet.css');

const mapModel =  {

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
        center: [37.0902, -95.7129],
        zoom: 3,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [],
        //drawControl: true
      },

    }

    export default mapModel;

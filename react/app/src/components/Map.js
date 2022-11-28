import React, { useEffect, useRef } from "react";
import L from 'leaflet';
import { Draw } from 'leaflet-draw';
import mapModel from '../models/mapModel'
import getFeatures from '../models/getFeatures';
import allLayers from '../models/allLayers';
import markerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
require('../../node_modules/leaflet/dist/leaflet.css')
require('../../node_modules/leaflet-draw/dist/leaflet.draw.css')

//detta är hack som gör så att leaflet hittar sin default-icon. pga react + webpack hittar inte
//med tanke på att vi rimligtvis gör egna icons sen kommer vi ersätta detta med custom icons
//ändå men just nu najs ha en marker
L.Marker.prototype.setIcon(L.icon({
  iconUrl:markerIcon
}))

const Map = () => {
  const dataFromBackend = {};

// Create our map ref:
  const mapRef = useRef(null)
  // Create the tile ref. NOT SURE IF WE NEED THIS! COME BACK AND DELETE IF NOT!:
  const tileRef = useRef(null)

  // Assign the tileRef to the tileLayer:
  tileRef.current = mapModel.tileLayer;
  // Adding a layer to the array Layers in map constructor seems to make the layer turned on
  // by default. We do this here by pushing bc we did the ref thing. If we don't need the tilelayer as a ref
  // we can add the layer normally in the mapParams
  mapModel.mapParams.layers.push(tileRef.current);
  // empty feature grouop to hold stuff we draw in the map
  const drawnItems = new L.FeatureGroup();
  // leaflet-draw draw control constructed with rule restricting construction of intersections between polygons
  const drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
});



  useEffect(() => {
    //this useeffect runs to fetch all data from backend
    //on cleanup we hope that we can use clearLayers to clean away the layers
    //but a) it is uncertain if this is necessary and b) right now we're only
    //cleaning the cities-layer
      (async () => {
        //vi hämtar data från backend och sparar ner själva DATAT i objektet dataFromBackend
        dataFromBackend.cities = await getFeatures.getCities();
        dataFromBackend.chargingStations = await getFeatures.getChargingStations();
        dataFromBackend.parkingLots = await getFeatures.getParkingLots();

        //alla FeatureGroups har vi specat i allLayers.js . Framöver tänker jag mig att vi där också
        //sätter style för de olika featuregroupsen
        //det vi gör här sen är att vi baserat på data i dataFromBackend lägger till själva DATAT i denna
        //featuregroup. addLayer lägger alltså till 1 datamängd som i vårt fall nog oftast är 1 punkt
        //eller 1 polygon. En featuregroup håller alltså många dataobjekt av samma typ här, med gemensamt
        //gränssnitt för interaktionen med varje ingående objekt (tända/släcka/klicka på)
        for (const city of dataFromBackend.cities) {
          allLayers.cities.addLayer(L.geoJson(city.position));
        }

        for (const charger of dataFromBackend.chargingStations) {
          //Testa bygga detta med const = och sedan adda attributes på den const
          //som jag sedan ropar på i allLayers click-funktion
          //kanske i e.target snarare än i this, får testa!
          const chargerObject = L.marker(charger.position);
          chargerObject.backendId = charger.id;
          console.log("CHARGEROBJ ID ", chargerObject.backendId)
          allLayers.chargingStations.addLayer(chargerObject)
        }

        for (const parking of dataFromBackend.parkingLots) {
          allLayers.parkingLots.addLayer(L.geoJson(parking.position));
        }
      })();

      return () => allLayers.cities.clearLayers()
  }, []);

  // This useEffect hook runs when the component is first mounted,
  // empty array in the end means only runs at first load of app
  useEffect(() => {

    // Init map and assign the map instance to the mapRef:
    mapRef.current =  L.map('map', mapModel.mapParams);
    //add the draw control to our map
    mapRef.current.addControl(drawControl);
    //SKA VI LÅTA DRAWNITEMS BO I ALLLAYERS OCKSÅ KANSKE?
    drawnItems.addTo(mapRef.current);
    //Lägg till alla layers i allLayers till kartan
    for (const layer in allLayers) {
      allLayers[layer].addTo(mapRef.current);
    };

    console.log("cities", allLayers.cities);
    console.log("drawnitems", drawnItems);
    // Pass a baseLayers object + an overlay object to the layer control.
    //If we want to add more baselayers, we do this in the first object
    //If we want to add more overlays, we do this in the second object
    //This can also be handled programmatically later on
    L.control.layers(
      {'OpenStreetMap': tileRef.current},
      {'DrawnItems': drawnItems,
      'Cities': allLayers.cities,
      'Parking stations': allLayers.parkingLots,
      'Charging stations': allLayers.chargingStations}
    ).addTo(mapRef.current); // Add the control to our map instance

    // Create the zoom control:
    L.control.zoom({
      position: "topright"
    }).addTo(mapRef.current); // Add the control to our map instance

    //this event handles the pushing of drawn objects into the empty feature group we made earlier
    //the alert serves no purpose
    mapRef.current.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;

      drawnItems.addLayer(layer);

      alert("ÄR DU NÖJD MED DENNA GEOMETRI?")
    });
    //at first had problems with "map already instantiated". calling this cleanup function ensures that
    // the map created in this effect is removed when the component unmounts
    //but i do not understand why we would need this to display the map at all
    //maybe build a counter that gets updated for every time this effect runs to understand if the app is recreating
    //the map many times?
    return () => mapRef.current.remove();
  }, []);





    return (
      <div>
        <div id="map" style={mapModel.mapStyles}/>
      </div>
    )
  }

  export default Map

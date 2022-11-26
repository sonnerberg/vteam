import React, { useEffect, useRef } from "react";
import L from 'leaflet';
import { Draw } from 'leaflet-draw';
import mapModel from '../models/mapModel'
require('../../node_modules/leaflet/dist/leaflet.css')
require('../../node_modules/leaflet-draw/dist/leaflet.draw.css')

const Map = () => {

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


  // This useEffect hook runs when the component is first mounted,
  // empty array in the end means only runs at first load of app
  useEffect(() => {

    // Init map and assign the map instance to the mapRef:
    mapRef.current =  L.map('map', mapModel.mapParams);
    //add the draw control to our map
    mapRef.current.addControl(drawControl);
    drawnItems.addTo(mapRef.current);
    // Pass a baseLayers object + an overlay object to the layer control.
    //If we want to add more baselayers, we do this in the first object
    //If we want to add more overlays, we do this in the second object
    //This can also be handled programmatically later on
    L.control.layers(
      {'OpenStreetMap': tileRef.current},
      {'DrawnItems': drawnItems}
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

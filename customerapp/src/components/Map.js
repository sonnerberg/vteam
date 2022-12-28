import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import mapModel from "../models/mapModel";
import mapStyles from "../models/mapStyles";
import allLayers from "../models/allLayers.js";
import getFeatures from "../models/getFeatures";

require("../../node_modules/leaflet/dist/leaflet.css");

const Map = (props) => {
  const [points, setPoints] = useState({});
  const dataFromBackend = {};

  // Create our map ref:
  const mapRef = useRef(null);
  // Create the tile ref. NOT SURE IF WE NEED THIS! COME BACK AND DELETE IF NOT!:
  const tileRef = useRef(null);

  // Assign the tileRef to the tileLayer:
  tileRef.current = mapModel.tileLayer;
  // Adding a layer to the array Layers in map constructor seems to make the layer turned on
  // by default. We do this here by pushing bc we did the ref thing. If we don't need the tilelayer as a ref
  // we can add the layer normally in the mapParams
  mapModel.mapParams.layers.push(tileRef.current);

  //function for loading scooters at moveend and zoomend
  //currently clears all POINTS and loads all POINTS bc
  //we dont have 1000 scooters in mock-backend + mock-backend cant handle returning
  //only points within bounds so we filter in frontend for now...
  const loadScooters = (bounds) => {
    allLayers.bikes.clearLayers();
    for (const bike of dataFromBackend.bikes) {
      if (bike.position.properties.rented === 0) {
        const newBike = L.geoJson(bike.position, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, mapStyles["scooter"]);
          },
        });
        if (bounds.contains(newBike.getBounds())) {
          allLayers.bikes.addLayer(newBike);
        }
      }
    }
  };
  useEffect(() => {
    (async () => {
      dataFromBackend.cities = await getFeatures.getCities(props.userToken);

      for (const city of dataFromBackend.cities) {
        allLayers.cities.addLayer(
          L.geoJson(city.position, {
            style: mapStyles.city,
          })
        );
      }
    })();

    return () => allLayers.cities.clearLayers();
  }, []);
  useEffect(() => {
    (async () => {
      dataFromBackend.chargingStations = await getFeatures.getChargingStations(
        props.userToken
      );

      for (const charger of dataFromBackend.chargingStations) {
        allLayers.chargingStations.addLayer(
          L.geoJson(charger.position, {
            pointToLayer: function (feature, latlng) {
              return L.marker(latlng, mapStyles["charger"]);
            },
          })
        );
      }
    })();

    return () => allLayers.chargingStations.clearLayers();
  }, []);
  useEffect(() => {
    (async () => {
      dataFromBackend.parkingLots = await getFeatures.getParkingLots(
        props.userToken
      );

      for (const parking of dataFromBackend.parkingLots) {
        allLayers.parkingLots.addLayer(
          L.geoJson(parking.position, {
            style: mapStyles.parking,
          })
        );
      }
    })();

    return () => allLayers.parkingLots.clearLayers();
  }, []);

  useEffect(() => {
    (async () => {
      dataFromBackend.zones = await getFeatures.getZones(props.userToken);

      for (const zone of dataFromBackend.zones) {
        allLayers.zones.addLayer(
          L.geoJson(zone.position, {
            style: mapStyles.zone,
          })
        );
      }
    })();

    return () => allLayers.zones.clearLayers();
  }, []);
  useEffect(() => {
    (async () => {
      dataFromBackend.bikes = await getFeatures.getBikes(props.userToken);
    })();
  }, []);
  // This useEffect hook runs when the component is first mounted,
  // empty array in the end means only runs at first load of app
  useEffect(() => {
    // Init map and assign the map instance to the mapRef:
    mapRef.current = L.map("map", mapModel.mapParams);
    // mapRef.current.locate({ setView: true, maxZoom: 16 });
    //add eventlisteners for zoomend and moveend. pass current bounds to
    //scooterloader function to load
    //only scooters currently visible
    mapRef.current.on("zoomend", () => {
      const bounds = mapRef.current.getBounds();
      loadScooters(bounds);
    });
    mapRef.current.on("moveend", () => {
      const bounds = mapRef.current.getBounds();
      loadScooters(bounds);
    });

    //SKA VI LÅTA props.drawnItems BO I ALLLAYERS OCKSÅ KANSKE?
    //Lägg till alla layers i allLayers till kartan
    for (const layer in allLayers) {
      allLayers[layer].addTo(mapRef.current);
    }

    // Create the zoom control:
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(mapRef.current); // Add the control to our map instance

    //at first had problems with "map already instantiated". calling this cleanup function ensures that
    // the map created in this effect is removed when the component unmounts
    //but i do not understand why we would need this to display the map at all
    //maybe build a counter that gets updated for every time this effect runs to understand if the app is recreating
    //the map many times?
    return () => mapRef.current.remove();
  }, []);

  // This useEffect runs when state for show<Feature> changes (true to false or vice versa)
  // it adds or removes layers in the map to show them to the user

  return (
    <div>
      <div id="map" style={mapModel.mapStyles} />
    </div>
  );
};

export default Map;

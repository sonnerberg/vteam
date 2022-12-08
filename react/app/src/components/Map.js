import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Draw } from 'leaflet-draw';
import mapModel from '../models/mapModel';
import mapStyles from '../models/mapStyles';
import allLayers from '../models/allLayers';
require('../../node_modules/leaflet/dist/leaflet.css');
require('../../node_modules/leaflet-draw/dist/leaflet.draw.css');

const Map = (props) => {
    const [points, setPoints] = useState({});

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
    // empty feature grouop to hold stuff we draw in the map
    // const drawnItems = new L.FeatureGroup();
    // leaflet-draw draw control constructed with rule restricting construction of intersections between polygons
    /*const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: props.drawnItems,
            poly: {
                allowIntersection: false,
            },
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true,
            },
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: false,
        },
    });*/

    //function for loading scooters at moveend and zoomend
    //currently clears all POINTS and loads all POINTS bc
    //we dont have 1000 scooters in mock-backend + mock-backend cant handle returning
    //only points within bounds so we filter in frontend for now...
    const loadScooters = (bounds) => {
        allLayers.bikes.clearLayers();

        for (const point of props.dataFromBackend.points) {
            const newPoint = L.geoJson(point, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, mapStyles['scooter']);
                },
            });
            if (bounds.contains(newPoint.getBounds()));
            allLayers.bikes.addLayer(newPoint);
        }
    };

    // This useEffect hook runs when the component is first mounted,
    // empty array in the end means only runs at first load of app
    useEffect(() => {
        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: props.drawnItems.current,
                poly: {
                    allowIntersection: false,
                },
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true,
                },
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
            },
        });
        // Init map and assign the map instance to the mapRef:
        mapRef.current = L.map('map', mapModel.mapParams);
        //add eventlisteners for zoomend and moveend. pass current bounds to
        //scooterloader function to load
        //only scooters currently visible
        mapRef.current.on('zoomend', () => {
            const bounds = mapRef.current.getBounds();
            loadScooters(bounds);
        });
        mapRef.current.on('moveend', () => {
            const bounds = mapRef.current.getBounds();
            loadScooters(bounds);
        });

        //SKA VI LÅTA props.drawnItems BO I ALLLAYERS OCKSÅ KANSKE?
        props.drawnItems.current.addTo(mapRef.current);
        //Lägg till alla layers i allLayers till kartan
        for (const layer in allLayers) {
            allLayers[layer].addTo(mapRef.current);
        }

        // Create the zoom control:
        L.control
            .zoom({
                position: 'topleft',
            })
            .addTo(mapRef.current); // Add the control to our map instance
        //add the draw control to our map. we remove it in the useeffect below....but must have it to
        //remove it in the useeffect, i.e find prettier way to handle this later :)
        mapRef.current.addControl(drawControl);
        /*props.activateDraw
            ? mapRef.current.addControl(drawControl)
            : drawControl.remove();*/
        //this event handles the pushing of drawn objects into the empty feature group we made earlier
        //the alert serves no purpose
        mapRef.current.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;

            props.drawnItems.current.addLayer(layer);
            console.log('DRAWNITEMS', props.drawnItems.current);
            //props.setTriggerNewObject(true);

            alert('ÄR DU NÖJD MED DENNA GEOMETRI?');
        });
        //at first had problems with "map already instantiated". calling this cleanup function ensures that
        // the map created in this effect is removed when the component unmounts
        //but i do not understand why we would need this to display the map at all
        //maybe build a counter that gets updated for every time this effect runs to understand if the app is recreating
        //the map many times?
        return () => mapRef.current.remove();
    }, []);
    /*[props.activateDraw]
    useEffect(() => {
        props.activateDraw
            ? mapRef.current.addControl(drawControl)
            : drawControl.remove();
    }, [props.activateDraw]);*/

    // This useEffect runs when state for show<Feature> changes (true to false or vice versa)
    // it adds or removes layers in the map to show them to the user
    useEffect(() => {
        props.showCities
            ? mapRef.current.addLayer(allLayers.cities)
            : mapRef.current.removeLayer(allLayers.cities);
        props.showParkings
            ? mapRef.current.addLayer(allLayers.parkingLots)
            : mapRef.current.removeLayer(allLayers.parkingLots);
        props.showChargingStations
            ? mapRef.current.addLayer(allLayers.chargingStations)
            : mapRef.current.removeLayer(allLayers.chargingStations);
        props.showZones
            ? mapRef.current.addLayer(allLayers.zones)
            : mapRef.current.removeLayer(allLayers.zones);
        props.showBikes
            ? mapRef.current.addLayer(allLayers.bikes)
            : mapRef.current.removeLayer(allLayers.bikes);
    }, [
        props.showCities,
        props.showParkings,
        props.showChargingStations,
        props.showZones,
        props.showBikes,
    ]);

    return (
        <div>
            <div id="map" style={mapModel.mapStyles} />
        </div>
    );
};

export default Map;

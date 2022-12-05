import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Draw } from 'leaflet-draw';
import mapModel from '../models/mapModel';
import mapStyles from '../models/mapStyles';
import getFeatures from '../models/getFeatures';
import allLayers from '../models/allLayers';
require('../../node_modules/leaflet/dist/leaflet.css');
require('../../node_modules/leaflet-draw/dist/leaflet.draw.css');

const Map = (props) => {
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
    // empty feature grouop to hold stuff we draw in the map
    const drawnItems = new L.FeatureGroup();
    // leaflet-draw draw control constructed with rule restricting construction of intersections between polygons
    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
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

    //function for loading scooters at moveend and zoomend
    //currently clears all POINTS and loads all POINTS bc
    //we dont have 1000 scooters in mock-backend + mock-backend cant handle returning
    //only points within bounds so we filter in frontend for now...
    const loadScooters = (bounds) => {
        allLayers.bikes.clearLayers();

        for (const point of dataFromBackend.points) {
            const newPoint = L.geoJson(point, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, mapStyles['scooter']);
                },
            });

            if (bounds.contains(newPoint.getBounds()))
                allLayers.bikes.addLayer(newPoint);
        }
    };

    useEffect(() => {
        //this useeffect runs to fetch all data from backend
        //on cleanup we hope that we can use clearLayers to clean away the layers
        //but a) it is uncertain if this is necessary and b) right now we're only
        //cleaning the cities-layer
        (async () => {
            //vi hämtar data från backend och sparar ner själva DATAT i objektet dataFromBackend
            dataFromBackend.cities = await getFeatures.getCities();
            dataFromBackend.chargingStations =
                await getFeatures.getChargingStations();
            dataFromBackend.parkingLots = await getFeatures.getParkingLots();
            dataFromBackend.bikes = await getFeatures.getBikes();
            dataFromBackend.workshops = await getFeatures.getWorkshops();
            dataFromBackend.zones = await getFeatures.getZones();
            dataFromBackend.points = await getFeatures.getPoints();

            //alla FeatureGroups har vi specat i allLayers.js . Framöver tänker jag mig att vi där också
            //sätter style för de olika featuregroupsen
            //det vi gör här sen är att vi baserat på data i dataFromBackend lägger till själva DATAT i denna
            //featuregroup. addLayer lägger alltså till 1 datamängd som i vårt fall nog oftast är 1 punkt
            //eller 1 polygon. En featuregroup håller alltså många dataobjekt av samma typ här, med gemensamt
            //gränssnitt för interaktionen med varje ingående objekt (tända/släcka/klicka på)
            for (const city of dataFromBackend.cities) {
                allLayers.cities.addLayer(
                    L.geoJson(city.position, {
                        style: mapStyles.city,
                    })
                );
            }

            for (const zone of dataFromBackend.zones) {
                allLayers.zones.addLayer(
                    L.geoJson(zone.position, {
                        style: mapStyles.zone,
                    })
                );
            }

            for (const charger of dataFromBackend.chargingStations) {
                console.log('CHARGER ', charger);
                allLayers.chargingStations.addLayer(
                    L.geoJson(charger.position, {
                        pointToLayer: function (feature, latlng) {
                            return L.marker(latlng, mapStyles['charger']);
                        },
                    })
                );
            }
            /*
            for (const bike of dataFromBackend.bikes) {
                //Testa bygga detta med const = och sedan adda attributes på den const
                //som jag sedan ropar på i allLayers click-funktion
                //kanske i e.target snarare än i this, får testa!
                const bikeObject = L.marker(bike.position);
                bikeObject.backendId = bike.id;
                bikeObject.rented = bike.rented;
                allLayers.bikes.addLayer(bikeObject);
            }*/

            for (const parking of dataFromBackend.parkingLots) {
                allLayers.parkingLots.addLayer(
                    L.geoJson(parking.position, {
                        style: mapStyles.parking,
                    })
                );
            }
        })();

        return () => allLayers.cities.clearLayers();
    }, []);

    // This useEffect hook runs when the component is first mounted,
    // empty array in the end means only runs at first load of app
    useEffect(() => {
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

        //SKA VI LÅTA DRAWNITEMS BO I ALLLAYERS OCKSÅ KANSKE?
        drawnItems.addTo(mapRef.current);
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
        //this event handles the pushing of drawn objects into the empty feature group we made earlier
        //the alert serves no purpose
        mapRef.current.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;

            drawnItems.addLayer(layer);

            alert('ÄR DU NÖJD MED DENNA GEOMETRI?');
        });
        //at first had problems with "map already instantiated". calling this cleanup function ensures that
        // the map created in this effect is removed when the component unmounts
        //but i do not understand why we would need this to display the map at all
        //maybe build a counter that gets updated for every time this effect runs to understand if the app is recreating
        //the map many times?
        return () => mapRef.current.remove();
    }, []);

    useEffect(() => {
        props.activateDraw
            ? mapRef.current.addControl(drawControl)
            : drawControl.remove();
    }, [props.activateDraw]);

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

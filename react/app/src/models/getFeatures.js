import axios from 'axios';
import L from 'leaflet';

const baseUrl = 'http://localhost:4000';

const getFeatures = {
    getCities: async function getCities() {
        const response = await fetch(`${baseUrl}/cities`);
        const result = await response.json();
        console.log(result)
        return result;
    },
    getChargingStations: async function getChargingStations() {
        const response = await fetch(`${baseUrl}/charging-stations`);
        const result = await response.json();
        console.log(result)
        return result;
    },
    getParkingLots: async function getParkingLots() {
        const response = await fetch(`${baseUrl}/parking-lots`);
        const result = await response.json();
        console.log(result)
        return result;
    },
}

export default getFeatures

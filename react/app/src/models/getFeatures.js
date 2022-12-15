const baseUrl = 'http://localhost:4000';
const backendUrl = 'http://localhost:8081/v1/';

const getFeatures = {
    getCities: async function getCities() {
        const response = await fetch(`${baseUrl}/cities`);
        const result = await response.json();
        return result;
    },
    getChargingStations: async function getChargingStations() {
        const response = await fetch(`${baseUrl}/charging-stations`);
        const result = await response.json();
        return result;
    },
    getParkingLots: async function getParkingLots() {
        const response = await fetch(`${baseUrl}/parking-lots`);
        const result = await response.json();
        return result;
    },
    getWorkshops: async function getWorkshops() {
        const response = await fetch(`${baseUrl}/workshops`);
        const result = await response.json();
        return result;
    },
    getZones: async function getZones() {
        const response = await fetch(`${baseUrl}/zones`);
        const result = await response.json();
        return result;
    },
    getBikes: async function getBikes() {
        const response = await fetch(`${backendUrl}/bikes`);
        console.log('RESPONSE ', response);
        const result = await response.json();
        console.log('RESULT ', result);
        return result.data;
    },
};

export default getFeatures;

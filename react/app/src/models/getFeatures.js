const baseUrl = 'http://localhost:4000';

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
    getBikes: async function getBikes() {
        const response = await fetch(`${baseUrl}/bikes`);
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
    getPoints: async function getPoints() {
        const response = await fetch(`${baseUrl}/points`);
        const result = await response.json();
        return result;
    },
};

export default getFeatures;

const baseUrl = 'http://localhost:4000';
const backendUrl = 'http://localhost:8081/v1';

const getFeatures = {
    getCities: async function getCities(token) {
        const response = await fetch(`${backendUrl}/cities`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    },
    getChargingStations: async function getChargingStations(token) {
        const response = await fetch(`${backendUrl}/charging-stations`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    },
    getParkingLots: async function getParkingLots(token) {
        const response = await fetch(`${backendUrl}/parking-lots`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    },
    getWorkshops: async function getWorkshops(token) {
        const response = await fetch(`${backendUrl}/workshops`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    },
    getZones: async function getZones(token) {
        const response = await fetch(`${backendUrl}/zones`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        console.log('RESPONSE ZONES ', response);
        const result = await response.json();
        console.log('result ZONES ', result);
        //EV SKA DETTA ERSÄTTAS AV RESULT.DATA SENARE? BIKES LEVERERAS SÅ
        return result;
    },
    getBikes: async function getBikes(token) {
        const response = await fetch(`${backendUrl}/bikes`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        console.log('RESPONSE ', response);
        const result = await response.json();
        console.log('RESULT ', result);
        return result.data;
    },
};

export default getFeatures;

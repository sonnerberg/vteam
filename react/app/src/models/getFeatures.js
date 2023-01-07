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
        console.log('CITIES, ', result);
        return result.data;
    },
    getChargingStations: async function getChargingStations(token) {
        const response = await fetch(`${backendUrl}/charging`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        console.log('Charging', result);
        return result.data;
    },
    getParkingLots: async function getParkingLots(token) {
        const response = await fetch(`${backendUrl}/parking`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result.data;
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
        const response = await fetch(`${backendUrl}/zone`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        console.log('RESPONSE ZONES ', response);
        const result = await response.json();
        console.log('result ZONES ', result);
        //EV SKA DETTA ERSÄTTAS AV RESULT.DATA SENARE? BIKES LEVERERAS SÅ
        return result.data;
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
    getBikeById: async function getBikes(token, id) {
        const response = await fetch(`${backendUrl}/bikes/${id}`, {
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
    getCityByName: async function getCityByName(token, name) {
        const response = await fetch(`${backendUrl}/cities/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        console.log('RESPONSE GET ONE CITY', response);
        const result = await response.json();
        console.log('RESULT ', result);
        return result.data;
    },
    getParkingById: async function getParkingById(token, id) {
        const response = await fetch(`${backendUrl}/parking/${id}`, {
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
    getChargingStationById: async function getChargingStationById(token, id) {
        const response = await fetch(`${backendUrl}/charging/${id}`, {
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
    getZoneById: async function getZoneById(token, id) {
        const response = await fetch(`${backendUrl}/zone/${id}`, {
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

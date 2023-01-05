//const baseUrl = "http://localhost:4000";
const backendUrl = "http://localhost:8082/v1/";

const getFeatures = {
  getCities: async function getCities(token) {
    const response = await fetch(`${backendUrl}cities`, {
      headers: {
        "x-access-token": token,
      },
      method: "GET",
    });
    const result = await response.json();
    return result.cities;
  },
  getChargingStations: async function getChargingStations(token) {
    const response = await fetch(`${backendUrl}chargers`, {
      headers: {
        "x-access-token": token,
      },
      method: "GET",
    });
    const result = await response.json();
    return result.chargingStations;
  },
  getParkingLots: async function getParkingLots(token) {
    const response = await fetch(`${backendUrl}parking`, {
      headers: {
        "x-access-token": token,
      },
      method: "GET",
    });
    const result = await response.json();
    return result.parking;
  },
  getBikes: async function getBikes(token) {
    const response = await fetch(`${backendUrl}bikes`, {
      headers: {
        "x-access-token": token,
      },
      method: "get",
    });
    console.log("RESPONSE BIKES ", response);

    const result = await response.json();
    console.log("RESULT BIKES ", result);

    return result.data;
  },

  getZones: async function getZones(token) {
    console.log("TOKEN IN ZOOOONES00", token);
    const response = await fetch(`${backendUrl}zones`, {
      headers: {
        "x-access-token": token,
      },
      method: "get",
    });
    console.log("RESPONSE ZONES ", response);
    const result = await response.json();
    console.log("result ZONES ", result);
    //EV SKA DETTA ERSÄTTAS AV RESULT.DATA SENARE? BIKES LEVERERAS SÅ
    return result.zones;
  },
};

export default getFeatures;

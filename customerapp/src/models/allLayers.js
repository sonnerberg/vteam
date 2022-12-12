import L from "leaflet";

const allLayers = {
  //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
  //så här initierar vi helt enkelt alla featurgroups (= lager i kartan) och sätter gemensamma funktioner
  //på alla ingående objekt, som popup och click enligt nedan
  cities: L.featureGroup().on("click", function (event) {
    console.log(event);
  }),
  chargingStations: L.featureGroup().on("click", function (event) {
    console.log(event);
  }),
  parkingLots: L.featureGroup().on("click", function (event) {
    console.log(event);
  }),
  bikes: L.featureGroup().on("click", function (event) {
    console.log(event);
  }),
  workshops: L.featureGroup().on("click", function () {
    alert("Clicked on a member of the workshop group!");
  }),
  zones: L.featureGroup().on("click", function (event) {
    console.log(event);
  }),
};

export default allLayers;

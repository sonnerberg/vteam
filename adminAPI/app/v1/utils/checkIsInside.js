import * as turf from '@turf/turf';

const checkIsInside = (arrayLongLat, poly) => {
    //LongLat betyder i vårt fall att talet som börjar med 16 typ kommer först i arrayen,
    //talet som börjar med 50-60 nåt kommer sist i arrayen
    const currentPosition = turf.point(arrayLongLat);

    //returns true om skotter är inne i den polygon som man anropat funktionen med
    //denna implementation innebär alltså att man nån annanstans loopar över alla relevanta polygoner
    //och anropar funktionen 1 gång per polygon
    //man kan såklart hämta polygoner och loopa över dom direkt i denna funktion också
    return turf.booleanPointInPolygon(currentPosition, poly);
};

module.exports = {
    checkIsInside,
};

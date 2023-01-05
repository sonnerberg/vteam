import L from 'leaflet';
import scooterIconUrl from '../images/electric-scooter-yellow.png';
import scooterRentedIconUrl from '../images/electric-scooter-green.png';
import scooterBlockedIconUrl from '../images/electric-scooter-red.png';
import chargerIconUrl from '../images/battery-status.png';

const scooterIcon = new L.Icon({
    iconUrl: scooterIconUrl,
    iconSize: [20, 20],
    //FATTA ICONANCHOR BÄTTRE!! DENNA SÄTTER EN OFFSET
    iconAnchor: [10, 10],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94],
});

const scooterRentedIcon = new L.Icon({
    iconUrl: scooterRentedIconUrl,
    iconSize: [20, 20],
    //FATTA ICONANCHOR BÄTTRE!! DENNA SÄTTER EN OFFSET
    iconAnchor: [10, 10],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94],
});

const scooterBlockedIcon = new L.Icon({
    iconUrl: scooterBlockedIconUrl,
    iconSize: [20, 20],
    //FATTA ICONANCHOR BÄTTRE!! DENNA SÄTTER EN OFFSET
    iconAnchor: [10, 10],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94],
});

const chargerIcon = new L.Icon({
    iconUrl: chargerIconUrl,
    iconSize: [20, 20],
    //FATTA ICONANCHOR BÄTTRE!! DENNA SÄTTER EN OFFSET
    iconAnchor: [10, 10],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94],
});

const mapStyles = {
    city: {
        color: '#14CB6F',
        weight: 5,
        opacity: 0.25,
    },
    zone: {
        color: '#ff7800',
        weight: 2,
        opacity: 0.8,
    },
    parking: {
        color: '#2ccce4',
        weight: 2,
        opacity: 0.8,
    },
    scooter: {
        icon: scooterIcon,
    },
    scooterRented: {
        icon: scooterRentedIcon,
    },
    charger: {
        icon: chargerIcon,
    },
};

export default mapStyles;

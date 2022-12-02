import L from 'leaflet';
import scooterIconUrl from '../images/electric-scooter.png';
import chargerIconUrl from '../images/battery-status.png';

const scooterIcon = new L.Icon({
    iconUrl: scooterIconUrl,
    iconSize: [20, 20],
    //FATTA ICONANCHOR BÄTTRE!! DENNA SÄTTER EN OFFSET
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94],
});

const chargerIcon = new L.Icon({
    iconUrl: chargerIconUrl,
    iconSize: [20, 20],
    //FATTA ICONANCHOR BÄTTRE!! DENNA SÄTTER EN OFFSET
    iconAnchor: [22, 94],
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
    charger: {
        icon: chargerIcon,
    },
};

export default mapStyles;

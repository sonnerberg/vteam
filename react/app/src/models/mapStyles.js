import L from 'leaflet';

const scooterIcon = new L.Icon({
    iconUrl: '../images/electric-scooter.png',
    iconSize: [38, 95],
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
};

export default mapStyles;

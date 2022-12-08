const layerAttributes = {
    stad: {
        position: {
            type: 'Feature',
            geometry: {},
            properties: {
                id: null,
                name: '',
                featureType: '',
            },
        },
    },
    parkering: {
        id: 1,
        position: {
            type: 'Feature',
            geometry: {},
            properties: {
                id: 1,
                type: '',
                featureType: 'parking-lots',
            },
        },
    },
    ladd: {
        id: 1,
        position: {
            type: 'Feature',
            properties: {
                id: 1,
                featureType: 'charging-stations',
            },
            geometry: {},
        },
    },
    zone: {
        id: 1,
        position: {
            type: 'Feature',
            geometry: {},
            properties: {
                id: 1,
                type: '',
                speedLimit: '',
                featureType: '',
            },
        },
    },
    scooter: {
        id: 1,
        position: {
            type: 'Feature',
            geometry: {},
            properties: {
                id: 1,
                number: 0,
                brand: '',
            },
        },
    },
};
export default layerAttributes;

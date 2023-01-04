const backendUrl = 'http://localhost:8081/v1';

const putFeatures = {
    putFeatures: async function putFeatures(data, token) {
        let dataToPut = {};
        dataToPut.coordinates = data.position.geometry.coordinates;
        for (const property in data.position.properties) {
            if (property !== 'featureType' && property !== 'id') {
                dataToPut[property] = data.position.properties[property];
            }
        }

        // To get the correct route from the featureType
        const routes = {
            cities: 'cities',
            'parking-lots': 'parking',
            'charging-stations': 'charging',
            zone: 'zone',
        };

        const ids = {
            cities: data.position.properties.name,
            'parking-lots': data.position.properties.id,
            'charging-stations': data.position.properties.id,
            zone: data.position.properties.id,
        };

        const route = routes[data.position.properties.featureType];

        const _id = ids[data.position.properties.featureType];

        console.log('Data to put', dataToPut);

        console.log(`${backendUrl}/${route}/${_id}`);

        const body = JSON.stringify(dataToPut);
        await fetch(`${backendUrl}/${route}/${_id}`, {
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'PUT',
        });
    },
};

export default putFeatures;

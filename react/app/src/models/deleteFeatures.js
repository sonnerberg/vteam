//const baseUrl = 'http://localhost:4000';
const backendUrl = 'http://localhost:8081/v1';

const deleteFeatures = {
    deleteFeatures: async function deleteFeatures(data, token) {
        const routes = {
            cities: 'cities',
            'parking-lots': 'parking',
            'charging-stations': 'charging',
            zone: 'zone',
            zones: 'zone',
        };

        const ids = {
            cities: data.position.properties.name,
            'parking-lots': data.position.properties.id,
            'charging-stations': data.position.properties.id,
            zone: data.position.properties.id,
            zones: data.position.properties.id,
        };

        const route = routes[data.position.properties.featureType];

        const _id = ids[data.position.properties.featureType];

        console.log('Token', token);

        await fetch(`${backendUrl}/${route}/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,

                'content-type': 'application/json',
            },
            method: 'DELETE',
        });
    },
};

export default deleteFeatures;

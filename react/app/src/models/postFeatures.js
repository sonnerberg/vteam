const baseUrl = 'http://localhost:4000';
const backendUrl = 'http://localhost:8081/v1';

const postFeatures = {
    postFeatures: async function postFeatures(data, token) {
        let dataToPost = {};
        dataToPost.coordinates = data.position.geometry.coordinates;
        console.log('Coordinates to post', dataToPost.coordinates);
        for (const property in data.position.properties) {
            if (property !== 'featureType' && property !== 'id') {
                dataToPost[property] = data.position.properties[property];
            }
        }

        // To get the correct route from the featureType
        const routes = {
            cities: 'cities',
            'parking-lots': 'parking',
            'charging-stations': 'charging',
            zone: 'zone',
        };

        const route = routes[data.position.properties.featureType];

        const body = JSON.stringify(dataToPost);

        await fetch(`${backendUrl}/${route}`, {
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,

                'content-type': 'application/json',
            },
            method: 'POST',
        });
    },
    postToGetBikes: async function postToGetBikes(token, bboxAsGeoJson) {
        const postData = JSON.stringify(bboxAsGeoJson);
        const response = await fetch(`${backendUrl}/bikes/within`, {
            body: postData,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'POST',
        });

        const result = await response.json();

        return result.data;
    },
    postToStopBike: async function postToStopBike(token, username) {
        const postData = {
            username: username,
        };
        const body = JSON.stringify(postData);
        await fetch(`${backendUrl}/bikes/return`, {
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'POST',
        });
    },
};

export default postFeatures;

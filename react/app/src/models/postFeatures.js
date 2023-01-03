const baseUrl = 'http://localhost:4000';
const backendUrl = 'http://localhost:8081/v1';

const postFeatures = {
    postFeatures: async function postFeatures(data, token) {
        const postData = JSON.stringify(data);
        const body = JSON.stringify({
            coordinates: data.position.geometry.coordinates,
            name: data.position.properties.name,
        });
        console.log('POSTDATA IN BACKEND ', postData);
        console.log(
            'POSTDATA 2 IN BACKEND ',
            data.position.geometry.coordinates
        );
        console.log('POSTDATA 3 IN BACKEND ', data.position.properties.name);

        const response = await fetch(
            `${backendUrl}/${data.position.properties.featureType}`,
            {
                body: body,
                headers: {
                    Authorization: `Bearer ${token}`,

                    'content-type': 'application/json',
                },
                method: 'POST',
            }
        );

        const result = await response.json();

        return result;
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
        const postData = JSON.stringify(username);
        const response = await fetch(`${backendUrl}/bikes/return`, {
            body: postData,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'POST',
        });

        const result = await response.json();
        console.log('STOP BIKE', result);

        return result.data;
    },
};

export default postFeatures;

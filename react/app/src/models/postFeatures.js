const baseUrl = 'http://localhost:4000';
const backendUrl = 'http://localhost:8081/v1/';

const postFeatures = {
    postFeatures: async function postFeatures(data) {
        const postData = JSON.stringify(data);
        const response = await fetch(
            `${baseUrl}/${data.position.properties.featureType}`,
            {
                body: postData,
                headers: {
                    'content-type': 'application/json',
                },
                method: 'POST',
            }
        );

        const result = await response.json();

        return result;
    },
    postToGetBikes: async function postToGetBikes(bboxAsGeoJson) {
        console.log('bboxAsGeoJson', bboxAsGeoJson);
        const postData = JSON.stringify(bboxAsGeoJson);
        const response = await fetch(`${backendUrl}/bikes/within`, {
            body: postData,
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        });
        console.log('postdata', postData);
        console.log('response', response);
        const result = await response.json();
        console.log('result', result);

        return result.data;
    },
};

export default postFeatures;

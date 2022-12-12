const baseUrl = 'http://localhost:4000';

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
};

export default postFeatures;

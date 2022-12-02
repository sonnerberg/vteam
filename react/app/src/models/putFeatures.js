const baseUrl = 'http://localhost:4000';

const putFeatures = {
    putFeatures: async function putFeatures(data) {
        const putData = JSON.stringify(data);
        const response = await fetch(
            `${baseUrl}/${data.position.properties.featureType}/${data.id}`,
            {
                body: putData,
                headers: {
                    'content-type': 'application/json',
                },
                method: 'PUT',
            }
        );

        const result = await response.json();

        return result;
    },
};

export default putFeatures;

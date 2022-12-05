const baseUrl = 'http://localhost:4000';

const deleteFeatures = {
    deleteFeatures: async function deleteFeatures(data) {
        const response = await fetch(
            `${baseUrl}/${data.position.properties.featureType}/${data.id}`,
            {
                method: 'DELETE',
            }
        );

        const result = await response.json();

        return result;
    },
};

export default deleteFeatures;

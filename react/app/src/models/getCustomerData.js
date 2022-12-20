const baseUrl = 'http://localhost:8081/v1';

const getCustomerData = {
    getTrips: async function getTrips(token) {
        const response = await fetch(`${baseUrl}/trips`);
        const result = await response.json();
        console.log(result);
        return result;
    },

    getTripsByUserName: async function getTripsByUserName(userName, token) {
        const response = await fetch(`${baseUrl}/trips/${userName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result.data;
    },
};

export default getCustomerData;

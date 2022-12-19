const baseUrl = 'http://localhost:8081/v1';

const getCustomerData = {
    getTrips: async function getUsers() {
        const response = await fetch(`${baseUrl}/trips`);
        const result = await response.json();
        console.log(result);
        return result;
    },

    getTripsByUserName: async function getTripsByUserName(userName) {
        console.log('Getting trips');
        const response = await fetch(`${baseUrl}/trips/${userName}`);
        const result = await response.json();
        return result.data;
    },
};

export default getCustomerData;

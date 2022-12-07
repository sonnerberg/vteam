const baseUrl = 'http://localhost:4000';

const getCustomerData = {
    getTrips: async function getUsers() {
        const response = await fetch(`${baseUrl}/trips`);
        const result = await response.json();
        console.log(result);
        return result;
    },

    getTripsByUserId: async function getTripsByUserId(user_id) {
        console.log('Getting trips');
        const response = await fetch(`${baseUrl}/trips`);
        const result = await response.json();
        const tripsByUser = [];
        for (const trip of result) {
            console.log('trip user', trip.userid);
            if (trip.userid === user_id) {
                tripsByUser.push(trip);
            }
        }

        return tripsByUser;
    },
};

export default getCustomerData;

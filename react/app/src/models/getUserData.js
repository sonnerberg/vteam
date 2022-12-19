const baseUrl = 'http://localhost:8081/v1';

const getUserData = {
    getUsers: async function getUsers(token) {
        const response = await fetch(`${baseUrl}/customer`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result.data;
    },
    getAdmins: async function getAdmins(token) {
        const response = await fetch(`${baseUrl}/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        const result = await response.json();
        return result.data;
    },
};

export default getUserData;

const baseUrl = 'http://localhost:8081';

const postUsers = {
    postUsers: async function postUsers(data, userType) {
        const postData = JSON.stringify(data);
        const response = await fetch(`${baseUrl}/${userType}/`, {
            body: postData,
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        });

        const result = await response.json();

        return result;
    },
    logInAdmin: async function logInAdmin(admin) {
        const response = await fetch(`${baseUrl}/v1/auth/login`, {
            body: JSON.stringify(admin),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        });

        const result = await response.json();
        console.log(result);
        return result;
    },
    registerAdmin: async function registerAdmin(data, token) {
        const response = await fetch(`${baseUrl}/v1/auth/register`, {
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'POST',
        });
    },
};

export default postUsers;

const baseUrl = 'http://localhost:8081/v1/';

const deleteUsers = {
    deleteCustomers: async function deleteCustomers(username, token) {
        const data = {
            username: username,
        };
        const bodyData = JSON.stringify(data);
        const response = await fetch(`${baseUrl}customer/delete/${username}`, {
            body: bodyData,
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'PUT',
        });
    },
    deleteAdmins: async function deleteAdmins(username, token) {
        const data = {
            username: username,
        };
        const bodyData = JSON.stringify(data);
        const response = await fetch(`${baseUrl}`, {
            body: bodyData,
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'PUT',
        });

        const result = await response.json();

        return result;
    },
};

export default deleteUsers;

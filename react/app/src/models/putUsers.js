const baseUrl = 'http://localhost:4000';

const putUsers = {
    putUsers: async function putUsers(data, userType) {
        const putData = JSON.stringify(data);
        const response = await fetch(`${baseUrl}/${userType}/${data.id}`, {
            body: putData,
            headers: {
                'content-type': 'application/json',
            },
            method: 'PUT',
        });

        const result = await response.json();

        return result;
    },
};

export default putUsers;

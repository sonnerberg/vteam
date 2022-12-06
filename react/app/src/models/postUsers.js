const baseUrl = 'http://localhost:4000';

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
};

export default postUsers;

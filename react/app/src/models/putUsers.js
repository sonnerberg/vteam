const baseUrl = 'http://localhost:8081/v1';

const putUsers = {
    putUser: async function putUser(user, token) {
        const updatedUser = {
            surname: user.surname,
            lastname: user.lastname,
            adress: user.adress,
            billing_adress: user.billing_adress,
            email: user.email,
            balance: user.balance,
            status: user.status,
        };
        const putData = JSON.stringify(updatedUser);
        const response = await fetch(`${baseUrl}/customer/${user.username}`, {
            body: putData,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'PUT',
        });
    },

    putAdmin: async function putAdmin(user, token) {
        const updatedUser = {
            email: user.email,
        };
        const putData = JSON.stringify(updatedUser);
        const response = await fetch(`${baseUrl}/admin/${user.email}`, {
            body: putData,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'PUT',
        });
    },
};

export default putUsers;

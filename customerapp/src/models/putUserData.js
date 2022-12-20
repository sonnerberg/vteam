const baseUrl = "http://localhost:4000";

const putUserData = {
  putUserData: async function putUserData(user, token) {
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
    const response = await fetch(`${baseUrl}/users/${user.username}`, {
      headers: {
        "x-access-token": token,
      },
      body: putData,
    });
    const result = await response.json();
    console.log(result);
    return result;
  },

  putUserBalance: async function putUserBalance(amount, username, token) {
    const data = {
      amount: amount,
    };
    const bodyData = JSON.stringify(data);
    const response = await fetch(`${baseUrl}/users/${username}`, {
      headers: {
        "x-access-token": token,
      },
      body: bodyData,
    });
    const result = await response.json();
    console.log(result);
    return result;
  },

  putUserPrepaid: async function putUserPrePaid(prepaid, username, token) {
    const data = {
      prepaid: prepaid,
    };
    const bodyData = JSON.stringify(data);
    const response = await fetch(`${baseUrl}/users/${username}`, {
      headers: {
        "x-access-token": token,
      },
      body: bodyData,
    });
    const result = await response.json();
    console.log(result);
    return result;
  },
};

export default putUserData;

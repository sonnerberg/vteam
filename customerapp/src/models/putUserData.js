const baseUrl = "http://localhost:8082/v1/user/update";

const putUserData = {
  putUserData: async function putUserData(user, token) {
    const updatedUser = {
      userName: user.username,
      surName: user.surname,
      lastName: user.lastname,
      adress: user.adress,
      billingAdress: user.billing_adress,
      email: user.email,
    };
    const putData = JSON.stringify(updatedUser);
    const response = await fetch(`${baseUrl}`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: putData,
      method: "PUT",
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
        "content-type": "application/json",
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
        "content-type": "application/json",
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

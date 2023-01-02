const baseUrl = "http://localhost:8082/v1/user";

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
    const response = await fetch(`${baseUrl}/update`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: putData,
      method: "PUT",
    });
    const result = await response.json();

    return result;
  },

  putUserBalance: async function putUserBalance(amount, username, token) {
    const data = {
      username: username,
      balance: amount,
    };
    const bodyData = JSON.stringify(data);
    await fetch(`${baseUrl}/balance`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });
  },

  putUserPaymentService: async function putUserPaymentService(
    paymentService,
    username,
    token
  ) {
    const data = {
      username: username,
    };
    const bodyData = JSON.stringify(data);
    if (paymentService === "klarna" || paymentService === "paypal") {
      await fetch(`${baseUrl}/klarna`, {
        headers: {
          "content-type": "application/json",
          "x-access-token": token,
        },
        body: bodyData,
        method: "POST",
      });
    } else if (paymentService === "none") {
      await fetch(`${baseUrl}/credit`, {
        headers: {
          "content-type": "application/json",
          "x-access-token": token,
        },
        body: bodyData,
        method: "POST",
      });
    }
  },
};

export default putUserData;

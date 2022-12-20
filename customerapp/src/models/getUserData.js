const baseUrl = "http://localhost:8082/v1/user";

const getUserData = {
  getUser: async function getUser(username, token) {
    console.log(username);
    const data = {
      userName: username,
    };

    const bodyData = JSON.stringify(data);
    console.log(bodyData);

    const response = await fetch(`${baseUrl}`, {
      headers: {
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });
    console.log(response);
    const result = await response.json();
    /*console.log(result);
    return result[0]; */
  },
  getTripsByUserName: async function getTripsByUserName(username, token) {
    const data = {
      userName: username,
    };

    const bodyData = JSON.stringify(data);

    const response = await fetch(`${baseUrl}/trips/${username}`, {
      headers: {
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });
    const result = await response.json();
    return result.data;
  },
};

export default getUserData;

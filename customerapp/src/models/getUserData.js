const baseUrl = "http://localhost:8082/v1/user";

const getUserData = {
  getUser: async function getUser(username, token) {
    const data = {
      userName: username,
    };

    const bodyData = JSON.stringify(data);

    const response = await fetch(`${baseUrl}`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });

    const result = await response.json();

    return result;
  },
  getTripsByUserName: async function getTripsByUserName(username, token) {
    const data = {
      userName: username,
    };

    const bodyData = JSON.stringify(data);

    const response = await fetch(`${baseUrl}/trips/`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });
    const result = await response.json();
    return result.trips;
  },
};

export default getUserData;

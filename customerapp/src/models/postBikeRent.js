const baseUrl = "http://localhost:8082/v1/bikes/";

const postBikeRent = {
  rentBike: async function rentBike(username, bikeId, token) {
    const data = {
      username: username,
      id: bikeId,
    };

    const bodyData = JSON.stringify(data);

    const response = await fetch(`${baseUrl}rent`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });

    return response.status;
  },
  returnBike: async function returnBike(username, token) {
    const data = {
      username: username,
    };

    const bodyData = JSON.stringify(data);

    const response = await fetch(`${baseUrl}return`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });

    return response.status;
  },
};

export default postBikeRent;

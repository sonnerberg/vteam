const baseUrl = "http://localhost:8082/v1/bikes/";

const postBikeRent = {
  rentBike: async function rentBike(username, bikeId, token) {
    console.log(username);
    const data = {
      useraame: username,
      id: bikeId,
    };

    const bodyData = JSON.stringify(data);
    console.log(bodyData);

    const response = await fetch(`${baseUrl}rent`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: bodyData,
      method: "POST",
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  },
  shit: "bajs",
};

export default postBikeRent;

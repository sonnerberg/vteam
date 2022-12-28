const baseUrl = "http://localhost:4000";

const getUserTrips = {
  getUserTrips: async function getUserTrips(username, token) {
    const response = await fetch(`${baseUrl}/${username}`, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  },
};

export default getUserTrips;

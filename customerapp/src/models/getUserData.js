const baseUrl = "http://localhost:4000";

const getUserData = {
  getUser: async function getUser(user, token) {
    const response = await fetch(`${baseUrl}/users/${user}`, {
      headers: {
        "x-access-token": token,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  },
  getTripsByUserName: async function getTripsByUserName(username, token) {
    const response = await fetch(`${baseUrl}/trips/${username}`, {
      headers: {
        "x-access-token": token,
      },
    });
    const result = await response.json();
    return result.data;
  },
};

export default getUserData;

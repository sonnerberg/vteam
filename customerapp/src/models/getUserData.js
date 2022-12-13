const baseUrl = "http://localhost:4000";

const getUserData = {
  getUser: async function getUser(user) {
    const response = await fetch(`${baseUrl}/users/${user}`);
    const result = await response.json();
    console.log(result);
    return result;
  },
};

export default getUserData;

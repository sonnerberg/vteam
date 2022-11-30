const baseUrl = 'http://localhost:4000'

const getUserData = {
    getUsers: async function getUsers() {
        const response = await fetch(`${baseUrl}/users`)
        const result = await response.json()
        console.log(result)
        return result
    },
    getAdmins: async function getAdmins() {
        const response = await fetch(`${baseUrl}/administrators`)
        const result = await response.json()
        console.log(result)
        return result
    },
}

export default getUserData

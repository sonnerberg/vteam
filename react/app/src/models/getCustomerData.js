const baseUrl = 'http://localhost:4000'

const getCustomerData = {
    getTrips: async function getUsers() {
        const response = await fetch(`${baseUrl}/trips`)
        const result = await response.json()
        console.log(result)
        return result
    },
}

export default getCustomerData

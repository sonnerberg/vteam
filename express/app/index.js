const express = require('express')
const app = express()
const port = 3000

const positionData = {}

const randomPosition = () => {
    // random id between 0-99
    const id = Math.floor(Math.random() * 100)
    const latitude = Math.random()
    const longitude = Math.random()

    return {
        id: id,
        latitude: latitude,
        longitude: longitude
    }

}

const objectTest = () => {
    // updates one bike
    const {id, latitude, longitude} = randomPosition()
    positionData[id] = {latitude, longitude}

    return positionData
}

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!')
})

app.get('/object', (req, res) => {
    res.status(200).json(objectTest())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

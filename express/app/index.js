const express = require('express')
const app = express()
const port = 3000

// nr of scooters
const smallNumber = 100
const bigNumber = 1000

const smallData = {}
const bigData = {}

const populateSmallData = () => {
    for (let i = 0; i < smallNumber; i++) {
        const {latitude, longitude} = randomPosition()
        smallData[i] = {latitude, longitude}
    }

}

const populateBigData = () => {
    for (let i = 0; i < bigNumber; i++) {
        const {latitude, longitude} = randomPosition()
        bigData[i] = {latitude, longitude}
    }
}

const randomPosition = () => {
    // random id between 0-(smallNumber - 1 )
    const id = Math.floor(Math.random() * smallNumber)
    const latitude = Math.random()
    const longitude = Math.random()

    return {
        id: id,
        latitude: latitude,
        longitude: longitude
    }
}

const objectTest = () => {
    // updates one scooter
    const {id, latitude, longitude} = randomPosition()
    smallData[id] = {latitude, longitude}

}

const getSmallData = () => {
    return smallData
}

const getBigData = () => {
    return bigData
}

populateSmallData()
populateBigData()

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!')
})

app.get('/object', (req, res) => {
    objectTest()
    res.send('Hello World from express and nodemon!')
})

app.get('/smalldata', (req, res) => {
    res.status(200).json(getSmallData())
})

app.get('/bigdata', (req, res) => {
    res.status(200).json(getBigData())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

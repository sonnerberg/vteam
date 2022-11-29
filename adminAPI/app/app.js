const express = require('express');
const { queryDatabase } = require('./database/mariadb');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!');
});

app.get('/mariadb', async (req, res) => {
    const sql = 'SELECT * FROM customer';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

module.exports = app;

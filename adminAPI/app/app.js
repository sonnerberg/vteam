const express = require('express');
const { queryDatabase } = require('./database/mariadb');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World from admin and nodemon!');
});

app.get('/mariadb', async (req, res) => {
    const sql = 'CALL get_filtered_admin("email@example.com")';
    const data = await queryDatabase(sql);
    res.status(200).json(data[0]);
});

module.exports = app;

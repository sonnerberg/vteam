const express = require('express');
const { queryDatabase } = require('./database/mariadb');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from express and Nodemon!');
});

app.get('/test', async (req, res) => {
    const sql = 'SELECT * FROM customer';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

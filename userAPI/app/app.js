const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const { queryDatabase } = require('./database/mariadb');
require('dotenv').config();

const app = express();

// app.use(cors());
// app.options('*', cors());
// // app.disable('x-powered-by');

// app.use(
//     bodyParser.urlencoded({
//         extended: false,
//     })
// );
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!');
});

app.get('/mariadb', async (req, res) => {
    const sql = 'SELECT * FROM customer';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

module.exports = app;

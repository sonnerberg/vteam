const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { queryDatabase } = require('./database/mariadb');
const v1 = require('./routes/v1/index.js');
const v2 = require('./routes/v2/index.js');
const auth = require('./routes/auth/index.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.options('*', cors());
// app.disable('x-powered-by');

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use('/v1', v1);
app.use('/v2', v2);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!');
});

app.get('/mariadb', async (req, res) => {
    const sql = 'SELECT * FROM customer';
    const data = await queryDatabase(sql);
    res.status(200).json(data);
});

module.exports = app;

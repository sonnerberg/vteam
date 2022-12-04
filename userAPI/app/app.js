const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!');
});

module.exports = app;

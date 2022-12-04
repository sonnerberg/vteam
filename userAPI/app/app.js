const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.options('*', cors());
// app.disable('x-powered-by');

const passport = require('passport');
require('./routes/auth/passport');

app.use(
    session({
        secret: 'secret',
    })
);
app.use(passport.initialize());
app.use(passport.session());

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

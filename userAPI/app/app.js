const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');

const passport = require('passport');
require('./routes/auth/passport');

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

app.use(
    session({
        secret: 'secret',
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World from express and nodemon!');
});

module.exports = app;

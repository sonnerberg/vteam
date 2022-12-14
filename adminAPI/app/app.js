const express = require('express');
const cors = require('cors');
const { queryDatabase } = require('./database/mariadb');

const app = express();
app.use(cors());
app.options('*', cors());
const v1 = require('./v1');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World from admin and nodemon!');
});

console.log('node env is', process.env.NOVE_ENV);
app.get('/mariadb', async (req, res) => {
    const sql = 'CALL get_filtered_admin(?)';
    const email = 'email@example.com';
    const data = await queryDatabase(sql, [email]);
    res.status(200).json(data[0]);
});

app.use('/v1', v1);

// // Print all registered routes
// app._router.stack.forEach(function (r) {
//     if (r.route && r.route.path) {
//         console.log(`{{baseURL}}${r.route.path}`);
//     }
// });

v1.stack.forEach(function (stack) {
    stack.handle.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.log(`{{baseURL}}/v1${r.route.path}`);
        }
    });
});

module.exports = app;

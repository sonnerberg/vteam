const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
const v1 = require('./v1');

app.use(express.json());

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
            console.log(
                `${String(Object.keys(r.route.methods)).padEnd(
                    4
                )} http://localhost:8081/v1${r.route.path}`
            );
            console.log();
        }
    });
});

module.exports = app;

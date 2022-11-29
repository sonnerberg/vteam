const PORT = 3000;
const app = require('./app'); // the actual Express application
const http = require('http');

const v1 = require('./v1/index.js');
const v2 = require('./v2/index.js');

app.use('/v1', v1);
app.use('/v2', v2);

// // Print all registered routes
// app._router.stack.forEach(function (r) {
//     if (r.route && r.route.path) {
//         console.log(r.route.path);
//     }
// });

// v1.stack.forEach(function (r) {
//     if (r.route && r.route.path) {
//         console.log(r.route.path);
//     }
// });

// v2.stack.forEach(function (r) {
//     if (r.route && r.route.path) {
//         console.log(r.route.path);
//     }
// });

const server = http.createServer(app);
server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

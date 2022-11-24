const app = require('./app'); // the actual Express application
const http = require('http');

const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

const PORT = 3000;
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

const app = require('./app'); // the actual Express application
const http = require('http');

const v1 = require('./v1/index.js');
const v2 = require('./v2/index.js');

const PORT = 3000;

app.use('/v1', v1);
app.use('/v2', v2);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

const PORT = 3000;
const app = require('./app');
const http = require('http');
const { queryDatabase } = require('./database/mariadb');

const v1 = require('./v1');

app.get('/', (req, res) => {
    res.send('Hello World from admin and nodemon!');
});

app.get('/mariadb', async (req, res) => {
    const sql = 'CALL get_filtered_admin("email@example.com")';
    const data = await queryDatabase(sql);
    res.status(200).json(data[0]);
});

app.use('/v1', v1);

// Print all registered routes
app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});

v1.stack.forEach(function (stack) {
    stack.handle.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.log(`/v1${r.route.path}`);
        }
    });
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

const PORT = 3000;
const app = require('./app'); // the actual Express application
const http = require('http');
// const cors = require('cors');

// const v1 = require('./routes/v1/index.js');
// const v2 = require('./routes/v2/index.js');
// const auth = require('./routes/auth/index.js');

// app.use(cors());
// app.options('*', cors());
// // app.disable('x-powered-by');

// app.use(
//     bodyParser.urlencoded({
//         extended: false,
//     })
// );
// app.use(bodyParser.json());

// app.use('/v1', v1);
// app.use('/v2', v2);
// app.use('/auth', auth);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

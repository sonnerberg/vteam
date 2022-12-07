const express = require('express');
const router = express.Router();

router.get('/', (_, res) => res.send('welcome to v2'));

module.exports = router;

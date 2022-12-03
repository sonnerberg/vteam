const express = require('express');

const router = express.Router();
router.post('/register', (_, res) => res.send('welcome to v1 @ admin-api'));
router.post('/login', (_, res) => res.send('welcome to v1 @ admin-api'));

module.exports = router;

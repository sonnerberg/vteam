const express = require('express');

const router = express.Router();
router.post('/register', (_, res) => res.send('register for admin'));
router.post('/login', (_, res) => res.send('login to admin'));

module.exports = router;

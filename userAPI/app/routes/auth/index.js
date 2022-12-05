const { getGithubProfile } = require('../../models/githubLogin');
const { login, registerUser } = require('../../models/passwordLogin');
const express = require('express');

const router = express.Router();

router.get('/github', async (req, res) => {
    const user = await getGithubProfile(req.query.code);
    console.log(`error or user: ${user.error?.message || user.data?.userName}`);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const userName = req.body?.userName;
    const password = req.body?.password;
    const token = await login(userName, password);
    res.json(token);
});

router.post('/register', async (req, res) => {
    const userName = req.body?.userName;
    const password = req.body?.password;
    const token = await registerUser(userName, password);
    res.json(token);
});

module.exports = router;

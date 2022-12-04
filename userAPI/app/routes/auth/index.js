const { getGithubProfile } = require('../../models/githubLogin');
const express = require('express');

const router = express.Router();

router.get('/login', async (req, res) => {
    const test = await getGithubProfile(req.query.code);
    console.log(`error or user: ${test.error?.message || test.data?.userName}`);
    res.json(test);
});

module.exports = router;

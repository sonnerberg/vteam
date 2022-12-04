// const { json } = require('body-parser');
const { getGithubProfile } = require('../../models/githubLogin');
const express = require('express');
const passport = require('passport');

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

router.get('/', (_, res) =>
    res.send(
        '<a href="http://localhost:8082/auth/github">Log in with Github</a>'
    )
);

router.get('/github', passport.authenticate('github'));

router.get(
    '/github/callback',
    passport.authenticate('github', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
    })
);

router.get('/login', async (req, res) => {
    const test = await getGithubProfile(req.query.code);
    console.log(`error or user: ${test.error?.message || test.data.userName}`);
    res.json(test);
});

router.get('/failure', (req, res) => {
    res.send('Something went wrong. Please try again');
});

router.get('/success', isLoggedIn, (req, res) => {
    res.json({
        data: req.user || 'no user',
    });
});

router.get('/test', isLoggedIn, (req, res) => {
    res.send(`
          ${req.user.emails[0].value}
      logged in`);
});

router.get('/logout', (req, res, next) => {
    // req.session.destroy();
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // res.redirect('/');
        res.send('You are now logged out!');
    });
});

module.exports = router;

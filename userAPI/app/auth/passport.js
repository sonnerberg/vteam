const passport = require('passport');
const GitHubStrategy = require('passport-github2');
require('dotenv').config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: 'http://localhost:8082/auth/github/callback',
            scope: ['user:email'],
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    )
);
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (user, cb) {
    cb(null, user);
});

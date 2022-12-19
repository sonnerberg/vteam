const { queryDatabase } = require('../database/mariadb');
const table = require('../config/tables.json');

const { createNewToken } = require('./jwtToken');

const accessTokenURL = 'https://github.com/login/oauth/access_token';
const userProfileURL = 'https://api.github.com/user';

/*
Takes an authorization code from github and returns username and email.
Email is blank if it's set to private in github profile.
*/
exports.getGithubProfile = async (code) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code,
    };

    const request = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(accessTokenURL, request);
        const result = await response.json();
        if (result.error) {
            return {
                error: {
                    message: result.error_description,
                    type: result.error,
                },
            };
        }

        const userResponse = await fetch(userProfileURL, {
            headers: {
                authorization: `token ${result.access_token}`,
            },
        });
        const user = await userResponse.json();
        if (user.message) {
            return {
                error: {
                    message: user.message,
                    type: 'bad credentials',
                },
            };
        }
        console.log(result);
        console.log(user);
        return {
            data: {
                userName: user.login,
                email: user.email || '',
            },
        };
    } catch (err) {
        const error = {
            error: {
                message: 'something went wrong getting github profile.',
                type: 'fetch or json parse error',
            },
        };
        return error;
    }
};

// TODO refactor
exports.loginWithGithubUser = async (githubUser) => {
    //
    const user = {
        ...githubUser,
    };

    // const sql = `SELECT id
    const sql = `SELECT username
    FROM ${table.user}
    WHERE username = ?`;
    const placeholder = [user.userName];

    const result = await queryDatabase(sql, placeholder);
    if (result.error) {
        return result;
    }

    if (!result[0]) {
        const insertUser = `INSERT INTO ${table.user}
        (username)
        VALUES (?)`;
        const userPlaceholder = [user.userName];

        const result = await queryDatabase(insertUser, userPlaceholder);
        if (result.error) {
            return result;
        }
        // const bigIntInsertId = result.insertId;
        // const insertId = Number(bigIntInsertId);
        // const payload = {
        // userId: insertId,
        // userName: user.userName,
        // };
        // return createNewToken(payload);
    }
    const payload = {
        // userId: result[0].id,
        userName: user.userName,
    };
    return createNewToken(payload);
};

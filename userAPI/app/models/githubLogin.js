const accessTokenURL = 'https://github.com/login/oauth/access_token';
const userProfileURL = 'https://api.github.com/user';

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
        // email needs to be public for access so maybe use login instead?
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

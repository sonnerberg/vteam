import React from 'react';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    Link,
} from '@mui/material';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('LOGIN');
        props.logIn();
    };

    return (
        <div>
            <Grid
                container
                spacing={0}
                justify="center"
                direction="row"
                className="login-container"
            >
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className="login-form"
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className="login-background"
                        >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Inloggning
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={handleSubmit}>
                                    <Grid
                                        container
                                        direction="column"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <TextField
                                                id="username"
                                                name="username"
                                                placeholder="Användarnamn"
                                                type="text"
                                                autoComplete="username"
                                                required
                                                autoFocus
                                                value={props.user}
                                                onChange={(e) =>
                                                    props.setUser(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="current-password"
                                                name="password"
                                                placeholder="Lösenord"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                value={props.pwd}
                                                onChange={(e) =>
                                                    props.setPwd(e.target.value)
                                                }
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="button-block"
                                            >
                                                Logga in
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Glömt lösenord?
                                </Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

LoginForm.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    toggleSignUpForm: PropTypes.func,
    logIn: PropTypes.func,
    user: PropTypes.string,
    setUser: PropTypes.func,
    pwd: PropTypes.string,
    setPwd: PropTypes.func,
};

export default LoginForm;

import React, { useEffect /* , useState */ } from "react";
import {
  Button,
  /* TextField, */
  Grid,
  Paper,
  Typography,
  /* Link, */
} from "@mui/material";

const LoginForm = (props) => {
  const githubURl = "https://github.com/login/oauth/authorize";
  const options = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT,
    scope: "user:email",
    //state: "http://localhost:3100",
  };
  const qs = new URLSearchParams(options);
  const fullRequest = `${githubURl}?${qs.toString()}`;

  //const [Github, setGithub] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(document.location.search);

    if (queryParams?.get("code")) {
      //setGithub(queryParams?.get("code"));
      (async () => {
        const tokenURl = "http://localhost:8082/auth/github";
        const queryParams = new URLSearchParams(document.location.search);
        const options = {
          code: queryParams?.get("code"),
        };
        const qs = new URLSearchParams(options);

        const getTokenFromServer = await fetch(`${tokenURl}?${qs.toString()}`);
        const { data } = await getTokenFromServer.json();
        console.log("data ", data);

        if (data.status === 200) {
          console.log("STATUS OK");
          props.setUserToken(data.token);
          props.setUserName(data.user);
        }
        props.setValue("map");
        // console.log("GITHUB ", Github);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid className="login-container">
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
                  Inloggning med GitHub
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <a href={fullRequest} target="_blank" rel="noreferrer">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Ta mig till GitHub!
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

/* const SendCodeToServer = () => {
  const tokenURl = "http://localhost:8082/auth/github";
  const queryParams = new URLSearchParams(document.location.search);
  const options = {
    code: queryParams?.get("code"),
  };
  const qs = new URLSearchParams(options);

  const getTokenFromServer = async () => {
    await fetch(`${tokenURl}?${qs.toString()}`);
  };
  return (
    <div>
      <div>Code: {queryParams.get("code") || "none"}</div>
      <div>State: {queryParams.get("state") || "none"}</div>
      <h3>byt code mot token</h3>
      <button onClick={getTokenFromServer}>send code to server</button>
    </div>
  );
};  */

/*
const LoginForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("LOGIN");
    props.logInAdmin();
  };

  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid className="login-container">
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
                  <Grid container direction="column" spacing={2}>
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
                        onChange={(e) => props.setUser(e.target.value)}
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
                        onChange={(e) => props.setPwd(e.target.value)}
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
};*/

export default LoginForm;

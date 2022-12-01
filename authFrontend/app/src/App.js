import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const rootURl = "https://github.com/login/oauth/authorize";

  const options = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT,
    scope: "user:email",
    state: "http://localhost:3000",
    // state: from,
  };

  const qs = new URLSearchParams(options);

  const full = `${rootURl}?${qs.toString()}`;

  const [user, setUser] = useState({ data: "no user" });
  // const [user, setUser] = useState("no user");
  const githubLogin = async () => {
    try {
      const response = await fetch("http://localhost:8082/auth/github");
      const result = await response.json();
      console.log(result);
      setUser(result);
    } catch {
      console.log("error ");
    }
  };

  const test = process.env.REACT_APP_GITHUB_CLIENT_ID;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test</p>
        <a
          className="App-link"
          // href="https://reactjs.org"
          href={full}
          target="_blank"
          rel="noopener noreferrer"
        >
          Login with Github
        </a>
        <button onClick={githubLogin}>Login with Github</button>
        <h2>{user.data}</h2>
        <h2>{test}</h2>
      </header>
    </div>
  );
}

export default App;

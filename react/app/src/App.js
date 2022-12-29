import './App.css';
import AppMap from './App_layerstack';
import AppUser from './App_user';
import LoginForm from './components/LoginForm';
import ToplevelSwitch from './components/ToplevelSwitch';
import postUsers from './models/postUsers';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useState } from 'react';

function App() {
    const [showUserUI, setShowUserUI] = useState(false);
    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [token, setToken] = useState();

    const logInAdmin = async () => {
        const adminToken = await postUsers.logInAdmin({
            email: user,
            password: pwd,
        });
        console.log(adminToken.data.token);
        setToken(adminToken.data.token);
    };
    if (token) {
        return (
            <div>
                <FormGroup sx={{ margin: 1 }}>
                    <FormControlLabel
                        control={
                            <ToplevelSwitch
                                showUser={showUserUI}
                                setShowUser={setShowUserUI}
                            />
                        }
                        label={
                            showUserUI
                                ? 'Växla till kartvy'
                                : 'Växla till användarvy'
                        }
                    />
                </FormGroup>
                {showUserUI ? (
                    <AppUser token={token} />
                ) : (
                    <AppMap token={token} />
                )}
            </div>
        );
    } else {
        return (
            <div className="topdiv">
                <LoginForm
                    logInAdmin={logInAdmin}
                    setPwd={setPwd}
                    setUser={setUser}
                />
            </div>
        );
    }
}
export default App;

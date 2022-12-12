import './App.css';
import AppMap from './App_layerstack';
import AppUser from './App_user';
import LoginForm from './components/LoginForm';
import ToplevelSwitch from './components/ToplevelSwitch';
import postUsers from './models/postUsers';

import { useState } from 'react';

function App() {
    const [showUserUI, setShowUserUI] = useState(false);
    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [token, setToken] = useState('korv');

    const logInAdmin = async () => {
        const adminToken = await postUsers.logInAdmin({
            username: user,
            password: pwd,
        });
        console.log(adminToken);
        setToken(adminToken);
    };
    if (token) {
        return (
            <div>
                <ToplevelSwitch
                    showUser={showUserUI}
                    setShowUser={setShowUserUI}
                />
                {showUserUI ? <AppUser /> : <AppMap />}
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

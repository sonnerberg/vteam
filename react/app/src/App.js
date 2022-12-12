import './App.css';
import AppMap from './App_layerstack';
import AppUser from './App_user';
import LoginForm from './components/LoginForm';
import ToplevelSwitch from './components/ToplevelSwitch';
import { useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUser, setShowUser] = useState(false);
    if (isLoggedIn) {
        return (
            <div>
                <ToplevelSwitch showUser={showUser} setShowUser={setShowUser} />
                {showUser ? <AppUser /> : <AppMap />}
            </div>
        );
    } else {
        return (
            <div className="topdiv">
                <LoginForm />
            </div>
        );
    }
}
export default App;

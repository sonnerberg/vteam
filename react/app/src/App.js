import './App.css';
import AppMap from './App_layerstack';
import AppUser from './App_user';
import ToplevelSwitch from './components/ToplevelSwitch';
import { useState } from 'react';

function App() {
    const [showUser, setShowUser] = useState(false);
    return (
        <div className="topdiv">
            <ToplevelSwitch showUser={showUser} setShowUser={setShowUser} />
            {showUser ? <AppUser /> : <AppMap />}
        </div>
    );
}
export default App;

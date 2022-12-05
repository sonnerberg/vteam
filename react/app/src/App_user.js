import './App_user.css';
import getUserData from './models/getUserData';
import getCustomerData from './models/getCustomerData';
import UserList from './components/UserList';

import { useEffect, useState } from 'react';

function App() {
    const [userData, setUserData] = useState(null);
    const [detailCard, setDetailCard] = useState(null);
    useEffect(() => {
        (async () => {
            const users = {};
            users.customerUserData = await getUserData.getUsers();
            users.adminUserData = await getUserData.getAdmins();
            setUserData(users);
        })();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-left">
                    {userData ? (
                        <UserList
                            userData={userData}
                            setDetailCard={setDetailCard}
                            showAdmins={false}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="App-right1">
                    {detailCard ? <div>{detailCard}</div> : <></>}
                </div>

                <div className="App-right2"></div>
            </header>
        </div>
    );
}

export default App;

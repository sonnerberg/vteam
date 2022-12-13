import './App_user.css';
import getUserData from './models/getUserData';
import getCustomerData from './models/getCustomerData';
import UserList from './components/UserList';
import TripContainer from './components/TripContainer';

import { useEffect, useState } from 'react';

function AppUser(props) {
    const [userData, setUserData] = useState(null);
    const [detailCard, setDetailCard] = useState(null);
    const [userFormCard, setUserFormCard] = useState(null);
    const [showUserFormCard, setShowUserFormCard] = useState(false);
    const [userTrips, setUserTrips] = useState(null);

    async function getUsers() {
        const users = {};
        users.customerUserData = await getUserData.getUsers();
        users.adminUserData = await getUserData.getAdmins();
        setUserData(users);
    }

    useEffect(() => {
        getUsers();
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
                            setUserFormCard={setUserFormCard}
                            setShowUserFormCard={setShowUserFormCard}
                            saveFunction={getUsers}
                            setUserTrips={setUserTrips}
                            token={props.token}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="App-right1">
                    {(() => {
                        if (detailCard || userFormCard) {
                            if (showUserFormCard) {
                                return userFormCard;
                            }

                            return detailCard;
                        }
                    })()}
                </div>

                <div className="App-right2">
                    {userTrips ? <TripContainer trips={userTrips} /> : <></>}
                </div>
            </header>
        </div>
    );
}

export default AppUser;

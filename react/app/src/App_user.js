import './App_user.css';
import getUserData from './models/getUserData';
import UserList from './components/UserList';
import TripContainer from './components/TripContainer';
import SearchUser from './components/SearchUser';

import { useEffect, useState } from 'react';

function AppUser(props) {
    const [userData, setUserData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [detailCard, setDetailCard] = useState(null);
    const [userFormCard, setUserFormCard] = useState(null);
    const [showUserFormCard, setShowUserFormCard] = useState(false);
    const [userTrips, setUserTrips] = useState(null);

    async function getUsers(token) {
        console.log('Getting users');
        const users = {};
        users.customerUserData = await getUserData.getUsers(token);
        users.adminUserData = await getUserData.getAdmins(token);
        setUserData(users);
        setFilteredData(users);
    }

    useEffect(() => {
        (async () => {
            await getUsers(props.token);
        })();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-left">
                    <SearchUser data={userData} setData={setFilteredData} />
                    {userData ? (
                        <UserList
                            userData={filteredData}
                            setDetailCard={setDetailCard}
                            showAdmins={false}
                            setUserFormCard={setUserFormCard}
                            setShowUserFormCard={setShowUserFormCard}
                            getUsers={getUsers}
                            setUserTrips={setUserTrips}
                            setUserData={setUserData}
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

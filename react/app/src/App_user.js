import './App_user.css';
import getUserData from './models/getUserData';
import UserList from './components/UserList';
import TripContainer from './components/TripContainer';
import SearchUser from './components/SearchUser';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';

import { useEffect, useState } from 'react';

function AppUser(props) {
    const [userData, setUserData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [detailCard, setDetailCard] = useState(null);
    const [userFormCard, setUserFormCard] = useState(null);
    const [showUserFormCard, setShowUserFormCard] = useState(false);
    const [userTrips, setUserTrips] = useState(null);
    const [showAdmins, setShowAdmins] = useState(false);

    async function getUsers(token) {
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
    }, [props.token]);

    const onSwitchChange = () => {
        setShowAdmins(!showAdmins);
        setDetailCard(null);
        setUserTrips(null);
        setUserFormCard(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-left">
                    <FormGroup sx={{ margin: 1 }}>
                        <FormControlLabel
                            control={
                                <Switch onChange={onSwitchChange}></Switch>
                            }
                            label={
                                showAdmins
                                    ? 'Växla till kunder'
                                    : 'Växla till administratörer'
                            }
                        />
                        {showAdmins ? (
                            <></>
                        ) : (
                            <SearchUser
                                data={userData}
                                setData={setFilteredData}
                                label={'Sök användare'}
                            />
                        )}
                    </FormGroup>
                    {userData ? (
                        <UserList
                            userData={filteredData}
                            setDetailCard={setDetailCard}
                            showAdmins={showAdmins}
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

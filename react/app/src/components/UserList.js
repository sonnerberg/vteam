import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useState } from 'react';
import { Switch } from '@mui/material';
import UserCard from './UserCard';
import LayerButton from './LayerButton';
import UserForm from './UserForm';
import putUsers from '../models/putUsers';
import postUsers from '../models/postUsers';
import getCustomerData from '../models/getCustomerData';

function renderRow(props) {
    const { index, style, data } = props;
    const handleClick = async () => {
        const trips = await getCustomerData.getTripsByUserId(data[index].id);
        if (trips) {
            data.setUserTrips(trips);
        } else {
            data.setUserTrips(null);
        }

        data.setUserFormCard(null);
        data.setShowUserFormCard(null);

        const handleClickSaveButton = async (newUserObject) => {
            const result = await putUsers.putUsers(
                newUserObject,
                data.userType
            );

            /* data.setDetailCard(<UserCard content={newUserObject} />); */

            data.setDetailCard(null);

            data.setUserTrips(null);

            //data.setUserFormCard(null);
            data.setShowUserFormCard(false);

            data.saveFunction();

            console.log(result);
        };

        const handleClickChangeButton = () => {
            const handleClickCancelButton = () => {
                data.setUserFormCard(null);
                data.setShowUserFormCard(false);
            };

            const cancelButton = (
                <LayerButton
                    buttonText={'Avbryt'}
                    size={'small'}
                    width={25}
                    handleClick={handleClickCancelButton}
                />
            );
            const userFormCard = (
                <UserForm
                    content={data[index]}
                    cancelButton={cancelButton}
                    /* setUserFormCard={data.setUserFormCard} */
                    /* setShowUserFormCard={data.setShowUserFormCard}
                    setDetailCard={data.setDetailCard} */
                    editButton={editButton}
                    /* saveFunction={data.saveFunction}
                    userType={data.userType} */
                    handleClickSaveButton={handleClickSaveButton}
                />
            );

            data.setUserFormCard(userFormCard);
            data.setShowUserFormCard(true);
            //data.setDetailCard(null);
        };

        const editButton = (
            <LayerButton
                buttonText={'Ändra'}
                size={'small'}
                width={25}
                handleClick={handleClickChangeButton}
            />
        );

        data.setDetailCard(
            <UserCard content={data[index]} editButton={editButton} />
        );
    };

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={`${index} - ${data[index].username}`} />
            </ListItemButton>
        </ListItem>
    );
}

function UserList(props) {
    const [showAdmins, setShowAdmins] = useState(props.showAdmins);

    const token = props.token;

    const data = showAdmins
        ? props.userData.adminUserData
        : props.userData.customerUserData;

    const userType = showAdmins ? 'administrators' : 'users';

    data.setDetailCard = props.setDetailCard;

    data.setUserFormCard = props.setUserFormCard;

    data.setShowUserFormCard = props.setShowUserFormCard;

    data.saveFunction = props.saveFunction;

    data.userType = userType;

    data.setUserTrips = props.setUserTrips;

    const newUserObject = {
        surname: '',
        lastname: '',
        address: '',
        'billing-address': '',
        username: '',
        pass: '',
        email: '',
        balance: 0,
        status: '',
    };

    const newAdminObject = {
        email: '',
        password: '',
    };

    const onSwitchChange = () => {
        setShowAdmins(!showAdmins);
        props.setDetailCard(null);
        props.setUserTrips(null);
    };

    let fakeResult = null;

    const handleClickSaveNewButton = async (newUserObject) => {
        if (data.UserType === 'administrators') {
            const result = await postUsers.registerAdmin(newUserObject, token);
            /*  const result2 = await postUsers.postUsers(
                newUserObject,
                data.userType
            ); */
        } else if (data.UserType === 'users') {
            const result = await postUsers.registerUser(newUserObject, token);
        }

        data.setDetailCard(null);
        /*  data.setDetailCard(
            <UserCard content={newUserObject} />
        ); */

        //data.setUserFormCard(null);
        data.setShowUserFormCard(false);

        // Get all users on save
        data.saveFunction();

        //console.log(fakeResult);
    };

    const handleClickNewButton = () => {
        const handleClickCancelButton = () => {
            props.setUserFormCard(null);
            props.setShowUserFormCard(false);
        };

        const cancelButton = (
            <LayerButton
                buttonText={'Avbryt'}
                size={'small'}
                width={25}
                handleClick={handleClickCancelButton}
            />
        );
        const userFormCard = (
            <UserForm
                content={showAdmins ? newAdminObject : newUserObject}
                cancelButton={cancelButton}
                handleClickSaveButton={handleClickSaveNewButton}
            />
        );

        props.setUserFormCard(userFormCard);
        props.setShowUserFormCard(true);
        props.setDetailCard(null);
        props.setUserTrips(null);
    };

    return (
        <div>
            <Switch onChange={onSwitchChange}></Switch>
            <LayerButton handleClick={handleClickNewButton} buttonText={'Ny'} />
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={data.length}
                overscanCount={5}
                itemData={data}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
}

export default UserList;

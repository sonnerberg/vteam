import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import { FixedSizeList } from 'react-window';
import UserCard from './UserCard';
import LayerButton from './LayerButton';
import UserForm from './UserForm';
import putUsers from '../models/putUsers';
import postUsers from '../models/postUsers';
import getCustomerData from '../models/getCustomerData';
import deleteUsers from '../models/deleteUsers';

function renderRow(props) {
    const { index, style, data } = props;
    const handleClick = async () => {
        if (data.userType === 'users') {
            const trips = await getCustomerData.getTripsByUserName(
                data[index].username,
                data.token
            );
            if (trips) {
                data.setUserTrips(trips);
            } else {
                data.setUserTrips(null);
            }
        }

        data.setUserFormCard(null);
        data.setShowUserFormCard(null);

        const handleClickSaveButton = async (newUserObject) => {
            if (data.userType === 'administrators') {
                await putUsers.putAdmin(newUserObject, data.token);
            } else if (data.userType === 'users') {
                await putUsers.putUser(newUserObject, data.token);
            }

            data.setDetailCard(null);

            data.setUserTrips(null);

            data.setShowUserFormCard(false);

            // Get all users
            data.getUsers(data.token);
        };

        const handleClickDeleteButton = async () => {
            if (data.userType === 'administrators') {
                await deleteUsers.deleteAdmins(
                    data[index].username,
                    data.token
                );
            } else if (data.userType === 'users') {
                await deleteUsers.deleteCustomers(
                    data[index].username,
                    data.token
                );
            }

            data.setDetailCard(null);

            data.setUserTrips(null);

            data.setShowUserFormCard(false);

            // Get all users
            data.getUsers(data.token);
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
                    editButton={editButton}
                    handleClickSaveButton={handleClickSaveButton}
                />
            );

            data.setUserFormCard(userFormCard);
            data.setShowUserFormCard(true);
            //data.setDetailCard(null);
        };

        const deleteButton = (
            <LayerButton
                buttonText={'Ta bort'}
                size={'small'}
                width={100}
                handleClick={handleClickDeleteButton}
            />
        );

        const editButton = (
            <LayerButton
                buttonText={'Ändra'}
                size={'small'}
                width={25}
                handleClick={handleClickChangeButton}
            />
        );

        if (data.userType === 'users') {
            data.setDetailCard(
                <UserCard
                    content={data[index]}
                    editButton={editButton}
                    deleteButton={deleteButton}
                />
            );
        } else if (data.userType === 'administrators') {
            data.setDetailCard(<UserCard content={data[index]} />);
        }
    };

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemText
                    primary={`${
                        data[index].username
                            ? data[index].username
                            : data[index].email
                    }`}
                />
            </ListItemButton>
        </ListItem>
    );
}

function UserList(props) {
    //const [showAdmins, setShowAdmins] = useState(props.showAdmins);

    const token = props.token;

    const data = props.showAdmins
        ? props.userData.adminUserData
        : props.userData.customerUserData;

    const userType = props.showAdmins ? 'administrators' : 'users';

    data.token = token;

    data.setDetailCard = props.setDetailCard;

    data.setUserFormCard = props.setUserFormCard;

    data.setShowUserFormCard = props.setShowUserFormCard;

    data.getUsers = props.getUsers;

    data.userType = userType;

    data.setUserTrips = props.setUserTrips;

    const newAdminObject = {
        email: '',
        password: '',
    };

    const handleClickSaveNewButton = async (newUserObject) => {
        if (data.userType === 'administrators') {
            await postUsers.registerAdmin(newUserObject, token);
        } else if (data.userType === 'users') {
            await postUsers.registerUser(newUserObject, token);
        }

        data.setDetailCard(null);

        data.setShowUserFormCard(false);

        // Get all users on save
        data.getUsers(props.token);
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
                content={newAdminObject}
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
            <FormGroup sx={{ margin: 1 }}>
                {props.showAdmins ? (
                    <LayerButton
                        handleClick={handleClickNewButton}
                        buttonText={'Ny'}
                        sx={{ mr: 'auto' }}
                        width={5}
                    />
                ) : (
                    <></>
                )}
            </FormGroup>

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

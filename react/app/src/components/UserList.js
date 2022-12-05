import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useState } from 'react';
import { Switch } from '@mui/material';
import UserCard from './UserCard';

function renderRow(props) {
    const { index, style, data } = props;
    console.log(data);
    console.log(data[index]);

    const handleClick = () => {
        console.log(`Clicked on ${data[index].username}`);

        data.setDetailCard(<UserCard content={data[index]} />);
    };

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={`${data[index].username}`} />
            </ListItemButton>
        </ListItem>
    );
}

function UserList(props) {
    const [showAdmins, setShowAdmins] = useState(props.showAdmins);

    const data = showAdmins
        ? props.userData.adminUserData
        : props.userData.customerUserData;

    data.setDetailCard = props.setDetailCard;

    const onSwitchChange = () => {
        setShowAdmins(!showAdmins);
    };

    return (
        <div>
            <Switch onChange={onSwitchChange}></Switch>
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

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { useState } from 'react';
import putUsers from '../models/putUsers';
import LayerButton from '../components/LayerButton';
import UserCard from './UserCard';
import UserForm from './UserForm';

/**
 * A form for editing user information
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The form
 */
const UserFormCard = (props) => {
    const rows = [];

    const [newUserObject, setNewUserObject] = useState(props.content);

    //console.log('formcard props.content', props.content);

    for (const property in props.content) {
        rows.push({
            name: property,
            value: props.content[property],
        });
    }

    const saveButton = (
        <LayerButton
            buttonText={'Spara'}
            size={'small'}
            width={25}
            handleClick={() => props.handleClickSaveButton(newUserObject)}
        />
    );

    function changeHandler(event) {
        let newObject = { ...newUserObject };

        console.log(newObject);
        newObject[event.target.name] = event.target.value;

        setNewUserObject({ ...newUserObject, ...newObject });
    }

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                {rows.map((row) => (
                    <TextField
                        disabled={row.name === 'id' ? true : false}
                        variant="outlined"
                        key={row.name}
                        label={row.name}
                        name={row.name}
                        defaultValue={row.value}
                        onChange={changeHandler}
                        sx={{ m: 1 }}
                    />
                ))}
            </CardContent>
            <CardActions>
                <div>{props.cancelButton}</div>
                <div>{saveButton}</div>
                <div>{props.deleteButton}</div>
            </CardActions>
        </Card>
    );
};

export default UserFormCard;

import { TextField } from '@mui/material';

export default function SearchUser(props) {
    const handleChange = async (event) => {
        if (event.target.value === '') {
            props.setData(props.data);
            console.log('Props data', props.data);
        } else {
            const data = props.data.customerUserData;
            console.log('Data', data);
            const newData = data.filter((item) =>
                item.username
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            );
            console.log('new data', newData);
            console.log('NewData', newData);
            props.setData((prev) => ({
                ...prev,
                ...{ customerUserData: newData },
            }));
        }
    };

    return (
        <TextField
            sx={{ width: 350, mt: 2 }}
            label={props.label}
            onChange={handleChange}
        />
    );
}

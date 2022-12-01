import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';

/**
 * A card with content
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The card
 */
const LayerFormCard = (props) => {
    const rows = [];

    console.log(props.content);

    for (const property in props.content) {
        if (property !== 'position')
            rows.push({ name: property, value: props.content[property] });
    }

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                {rows.map((row) => (
                    <TextField
                        variant="outlined"
                        key={row.name}
                        label={row.name}
                        defaultValue={row.value}
                        onChange={props.onChangeFunction}
                    />
                ))}
            </CardContent>
            <CardActions>
                <div>{props.button}</div>
            </CardActions>
        </Card>
    );
};

export default LayerFormCard;

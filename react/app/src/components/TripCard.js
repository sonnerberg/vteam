import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * A card with content
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The card
 */
const TripCard = (props) => {
    const rows = [];

    console.log(props.content);

    for (const property in props.content) {
        console.log('trip property', property);
        if (property === 'startposition') {
            rows.push({
                name: property,
                value: `${props.content.startposition.longitude}Longitude: ${props.content.startposition.longitude} Latitude: ${props.content.startposition.latitude} `,
            });
        } else if (property === 'endposition') {
            rows.push({
                name: property,
                value: `${props.content.startposition.longitude}Longitude: ${props.content.endposition.longitude} Latitude: ${props.content.endposition.latitude} `,
            });
        } else
            rows.push({
                name: property,
                value: props.content[property],
            });
    }

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardActions>
                <div>{props.editButton}</div>
            </CardActions>
        </Card>
    );
};

export default TripCard;

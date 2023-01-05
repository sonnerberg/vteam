import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

/**
 * A card with content
 * @param {object} props - Props for the function
 * @param {object} props.content Object with content
 * @returns {React.ReactElement} - The card
 */
const LayerCard = (props) => {
    const rows = [];

    if (props.content.position.properties.featureType === 'bikes') {
        for (const property in props.content.position.properties) {
            if (props.content.position.properties[property] === 0) {
                rows.push({
                    name: property,
                    value: 'Nej',
                });
            } else if (
                props.content.position.properties[property] === 1 &&
                property !== 'id'
            ) {
                rows.push({
                    name: property,
                    value: 'Ja',
                });
            } else {
                rows.push({
                    name: property,
                    value: props.content.position.properties[property],
                });
            }
        }
    } else {
        for (const property in props.content.position.properties) {
            rows.push({
                name: property,
                value: props.content.position.properties[property],
            });
        }
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
                {props.button?.map((button, index) => (
                    <div key={index}>{button}</div>
                ))}{' '}
            </CardActions>
        </Card>
    );
};

export default LayerCard;

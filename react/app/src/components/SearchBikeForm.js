import { useState } from 'react';
import L from 'leaflet';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import getFeatures from '../models/getFeatures.js';

const SearchBikeForm = (props) => {
    const [bikeId, setBikeId] = useState();
    const handleClose = () => {
        props.setOpenSearchForm(false);
    };
    const handleChange = (e) => {
        setBikeId(e.target.value);
    };
    const handleHire = async () => {
        const returnstatement = await getFeatures.getBikeById(
            props.token,
            bikeId
        );

        props.mapRef.current.setView(
            [
                returnstatement[0].position.geometry.coordinates[1],
                returnstatement[0].position.geometry.coordinates[0],
            ],
            16
        );
        props.setOpenSearchForm(false);
    };

    return (
        <div>
            <Dialog open={props.openSearchForm} onClose={handleClose}>
                <DialogTitle>Sök elsparkcykel</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Skriv ID på den elsparkcykel du vill söka efter
                    </DialogContentText>
                    <TextField
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="bikeid"
                        label="ID för elsparkcykel"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Avbryt</Button>
                    <Button onClick={handleHire}>Sök</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SearchBikeForm;

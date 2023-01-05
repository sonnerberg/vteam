import { useState } from 'react';
import L from 'leaflet';
import eventBus from '../models/eventBus';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import getFeatures from '../models/getFeatures.js';

const SearchParkingForm = (props) => {
    const [parkingId, setParkingId] = useState();
    const handleClose = () => {
        props.setOpenSearchForm(false);
    };
    const handleChange = (e) => {
        setParkingId(e.target.value);
    };
    const handleSearch = async () => {
        const returnstatement = await getFeatures.getParkingById(
            props.token,
            parkingId
        );

        console.log(returnstatement);

        const polygon = L.polygon(
            returnstatement[0].position.geometry.coordinates
        );

        let center = polygon.getBounds().getCenter();

        // Why do we have to switch lat and lng around?
        const center2 = {
            lat: center.lng,
            lng: center.lat,
        };

        //center = L.latLng(center);

        props.mapRef.current.setView(center2, 8);
        props.setOpenSearchForm(false);

        eventBus.dispatch('parkingClicked', {
            position: returnstatement[0].position,
        });
    };

    return (
        <div>
            <Dialog open={props.openSearchForm} onClose={handleClose}>
                <DialogTitle>Sök parkering</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Skriv id på den parkering du vill söka efter
                    </DialogContentText>
                    <TextField
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="parkingid"
                        label="Id på parkering"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Avbryt</Button>
                    <Button onClick={handleSearch}>Sök</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SearchParkingForm;

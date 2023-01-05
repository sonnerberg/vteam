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

const SearchCityForm = (props) => {
    const [cityName, setCityName] = useState();
    const handleClose = () => {
        props.setOpenSearchForm(false);
    };
    const handleChange = (e) => {
        setCityName(e.target.value);
    };
    const handleSearch = async () => {
        const returnstatement = await getFeatures.getCityByName(
            props.token,
            cityName
        );

        console.log(returnstatement);

        const polygon = L.polygon(
            returnstatement[0].position.geometry.coordinates
        );

        console.log('Polygon', polygon);

        let center = polygon.getBounds().getCenter();

        console.log(center);

        // Why do we have to switch lat and lng around?
        let center2 = {
            lat: center.lng,
            lng: center.lat,
        };

        //center = L.latLng(center);

        props.mapRef.current.setView(center2, 8);
        props.setOpenSearchForm(false);

        eventBus.dispatch('cityClicked', {
            position: returnstatement[0].position,
        });
    };

    const handleStop = async () => {
        const returnstatement = await getFeatures.getCityByName(
            props.token,
            cityName
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
                <DialogTitle>Sök stad</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Skriv namn på den stad du vill söka efter
                    </DialogContentText>
                    <TextField
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="cityname"
                        label="Namn på stad"
                        type="text"
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

export default SearchCityForm;

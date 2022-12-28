import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import postBikeRent from "../models/postBikeRent.js";

const HireBikeForm = (props) => {
  const [bikeId, setBikeId] = useState();
  const handleClose = () => {
    props.setOpenHireForm(false);
  };
  const handleChange = (e) => {
    setBikeId(e.target.value);
  };
  const handleHire = async () => {
    const returnstatement = await postBikeRent.rentBike(
      props.userName,
      bikeId,
      props.userToken
    );
    console.log("RETURNED FROM BACKEND", returnstatement);
    if (returnstatement === 200) {
      console.log("NOT READY TO HIRE");
      props.setReadyToHire((prev) => !prev);
      props.setOpenHireForm(false);
    }
  };

  const handleReturn = async () => {
    const returnstatement = await postBikeRent.returnBike(
      props.userName,
      props.userToken
    );
    console.log("RETURNED FROM BACKEND", returnstatement);
    if (returnstatement === 200) {
      props.setReadyToHire((prev) => !prev);
      props.setOpenHireForm(false);
    }
  };

  const hireBike = (
    <div>
      <Dialog open={props.openHireForm} onClose={handleClose}>
        <DialogTitle>Hyr elsparkcykel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Skriv ID på den elsparkcykel du vill hyra
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
          <Button onClick={handleHire}>Hyr</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const returnBike = (
    <div>
      <Dialog open={props.openHireForm} onClose={handleClose}>
        <DialogTitle>Lämna tillbaka elsparkcykel</DialogTitle>
        <DialogContent>
          <DialogContentText>Har du åkt klart?</DialogContentText>
          <ButtonGroup fullWidth={true}>
            <Button variant="contained" onClick={handleReturn}>
              Ja
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Nej
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </div>
  );

  return props.readyToHire ? hireBike : returnBike;
};

export default HireBikeForm;

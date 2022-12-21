import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import postBikeRent from "../models/postBikeRent";

const HireBikeForm = (props) => {
  const [bikeId, setBikeId] = useState();
  const handleClose = () => {
    props.setOpenHireForm(false);
  };
  const handleChange = (e) => {
    setBikeId(e.target.value);
  };
  const handleHire = async () => {
    console.log("DU HAR HYRT CYKEL NUMMER ", +bikeId);
    console.log("POSTBIKERENT", postBikeRent.rentBike);
    const returnstatement = await postBikeRent.rentBike(
      props.username,
      bikeId,
      props.userToken
    );
    console.log("RETURNED FROM BACKEND", returnstatement);
    props.setOpenHireForm(false);
  };

  return (
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
};

export default HireBikeForm;

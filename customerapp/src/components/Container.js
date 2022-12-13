import { useState } from "react";
import { Grid, Button } from "@mui/material";
import Map from "./Map";

const Container = (props) => {
  return (
    <Grid container>
      <Map />
      <Grid container>
        <Grid item xs={4}>
          <Button fullWidth={true} variant="contained">
            Karta
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth={true} variant="contained">
            Mitt konto
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth={true} variant="contained">
            Logga ut
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Container;

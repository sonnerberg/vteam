import { useState } from "react";
import {
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Fab,
} from "@mui/material";
import {
  RestoreIcon,
  FavoriteIcon,
  LocationOnIcon,
  ElectricScooter,
} from "@mui/icons-material";

import Map from "./Map";

const Container = (props) => {
  const [value, setValue] = useState("");
  return (
    <Grid container direction="column" justify="space-between">
      <Grid item xs={12}>
        <Map />
      </Grid>
      <Fab color="primary" aria-label="add">
        <ElectricScooter />
      </Fab>
      <Grid
        item
        xs={12}
        container
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
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

/*

            <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
*/

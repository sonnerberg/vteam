import { useState } from "react";
import {
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Fab,
} from "@mui/material";
import {
  ManageAccounts,
  Layers,
  Login,
  ElectricScooter,
} from "@mui/icons-material";

import Map from "./Map";

const Container = (props) => {
  const [value, setValue] = useState("map");
  let view;
  if (value === "map") {
    view = <Map />;
    console.log("MAP");
  } else if (value === "account") {
    view = <Map />;
    console.log("ACCOUNT");
  } else if (value === "login") {
    view = <Map />;
    console.log("LOGIN");
  }
  return (
    <Grid container direction="column" justify="space-between">
      <Grid item xs={12}>
        {view}
      </Grid>
      <Fab color="primary" aria-label="add">
        <ElectricScooter />
      </Fab>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log("VALUE IS ", value);
        }}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction label="Karta" icon={<Layers />} value="map" />
        <BottomNavigationAction
          label="Konto"
          icon={<ManageAccounts />}
          value="account"
        />
        <BottomNavigationAction
          label="Logga in"
          icon={<Login />}
          value="login"
        />
      </BottomNavigation>
    </Grid>
  );
};
export default Container;

/*

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
*/

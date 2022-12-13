import { useState, useEffect } from "react";
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
import getUserData from "../models/getUserData";
import UserCard from "./UserCard";

const Container = (props) => {
  const [value, setValue] = useState("map");
  const [userData, setUserData] = useState("");

  async function getUser() {
    //const user = {};
    const user = await getUserData.getUser(1);

    setUserData(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  let view;
  if (value === "map") {
    view = <Map />;
    console.log("MAP");
  } else if (value === "account") {
    view = <UserCard content={userData} />;
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

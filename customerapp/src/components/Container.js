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
import LoginForm from "./LoginForm";

const Container = (props) => {
  const [value, setValue] = useState("login");
  const [userToken, setUserToken] = useState();
  const [userData, setUserData] = useState();

  async function getUser() {
    //const user = {};
    const user = await getUserData.getUser(1);

    setUserData(user);
  }

  useEffect(() => {
    console.log("USERTOKEN, ", userToken);
    getUser();
  }, [userToken]);

  let view;
  if (value === "map") {
    view = <Map />;
  } else if (value === "account") {
    view = <UserCard content={userData} />;
  } else if (value === "login") {
    view = (
      <LoginForm
        setValue={setValue}
        setUserToken={setUserToken}
        getUser={getUser}
      />
    );
  }
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        {view}
      </Grid>
      {userData && value === "map" ? (
        <Fab color="primary" aria-label="add">
          <ElectricScooter />
        </Fab>
      ) : null}

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

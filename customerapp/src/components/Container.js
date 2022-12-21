import { useState, useEffect } from "react";
import {
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from "@mui/material";
import {
  ManageAccounts,
  Layers,
  Login,
  Logout,
  ElectricScooter,
} from "@mui/icons-material";

import Map from "./Map";
import getUserData from "../models/getUserData";
import UserCard from "./UserCard";
import UserForm from "./UserForm";
import BalanceForm from "./BalanceForm";
import PrePaidForm from "./PrePaidForm";
import TripContainer from "./TripContainer";
import LoginForm from "./LoginForm";
import putUserData from "../models/putUserData";

const Container = (props) => {
  const [value, setValue] = useState("login");
  const [userToken, setUserToken] = useState();
  const [userName, setUserName] = useState();
  const [userData, setUserData] = useState();
  const [userTrips, setUserTrips] = useState();
  const [scanQrCode, setScanQrCode] = useState(false);
  const [accountView, setAccountView] = useState("userInfo");

  async function getUser() {
    //const user = {};
    const user = await getUserData.getUser(userName, userToken);

    setUserData(user);
  }

  async function getUserTrips() {
    const trips = await getUserData.getTripsByUserName(userName, userToken);
    console.log("Trips", trips);
    setUserTrips(trips);
  }

  useEffect(() => {
    console.log("USERTOKEN, ", userToken);
    (async () => {
      await getUser();
      await getUserTrips();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);
  useEffect(() => {
    if (value === "logout") {
      setUserToken(null);
    }
  }, [value]);

  async function saveUserInformation(newUserObject) {
    await putUserData.putUser(newUserObject, userToken);
    await getUser();
    setAccountView("userInfo");
  }

  async function saveUserBalanceInformation(amount, username) {
    await putUserData.putUserBalance(amount, username, userToken);
    await getUser();
    setAccountView("userInfo");
  }

  async function saveUserPaymentServiceInformation(prepaid, username) {
    await putUserData.putUserPrepaid(prepaid, username, userToken);
    await getUser();
    setAccountView("userInfo");
  }

  let view;
  if (value === "map" && userToken) {
    view = <Map />;
  } else if (value === "account" && userToken) {
    if (accountView === "userInfo") {
      view = (
        <Grid container justify="center" columns={{ xs: 12, sm: 6, md: 6 }}>
          <Grid item xxs={12} sm={6} md={6}>
            <UserCard
              content={userData}
              handleClickEditButton={() => setAccountView("editUser")}
              handleClickEditBalanceButton={() => setAccountView("editBalance")}
              handleClickEditPaymentServiceButton={() =>
                setAccountView("editPaymentService")
              }
            />
            <Grid item xs={12} sm={6} md={6}>
              <TripContainer trips={userTrips} />
            </Grid>
          </Grid>
        </Grid>
      );
    } else if (accountView === "editUser") {
      view = (
        <UserForm
          content={userData}
          handleClickSaveButton={saveUserInformation}
          handleClickCancelButton={() => setAccountView("userInfo")}
        />
      );
    } else if (accountView === "editBalance") {
      view = (
        <BalanceForm
          username={userData.username}
          handleClickSaveButton={saveUserBalanceInformation}
          handleClickCancelButton={() => setAccountView("userInfo")}
        />
      );
    } else if (accountView === "editPaymentService") {
      view = (
        <PrePaidForm
          username={userData.username}
          handleClickSaveButton={saveUserPaymentServiceInformation}
          handleClickCancelButton={() => setAccountView("userInfo")}
        />
      );
    }
  } else if (value === "login") {
    view = (
      <LoginForm
        setValue={setValue}
        setUserToken={setUserToken}
        setUserData={setUserData}
        setUserName={setUserName}
        getUser={getUser}
      />
    );
  } else if (value === "logout") {
    view = <div> Tack för besöket</div>;
  }

  if (scanQrCode) {
    return <div>RELOAD</div>;
  } else {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          {view}
        </Grid>
        {userToken && value === "map" ? (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setScanQrCode(true);
            }}
          >
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
          {userToken ? (
            <BottomNavigationAction
              label="Logga ut"
              icon={<Logout />}
              value="logout"
            />
          ) : (
            <BottomNavigationAction
              label="Logga in"
              icon={<Login />}
              value="login"
            />
          )}
        </BottomNavigation>
      </Grid>
    );
  }
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

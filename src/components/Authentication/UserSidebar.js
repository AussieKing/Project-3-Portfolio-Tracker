//! SIDEBAR FOR USER PROFILE
//? This is the sidebar for the user profile page. It will contain the user's information and allow them to edit it.
//? It will also contain the user's watchlist and allow them to edit or delete them.
//? It is made using the MUI Drawer component.

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Typography, Button } from "@mui/material";
import { CryptoState } from "../../Pages/CryptoContext";
import { styled } from '@mui/system';
import { auth } from '../../firebase';

const StyledContainer = styled('div')(({ theme }) => ({
  width: 350,
  height: "100%",
  padding: 25,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "monospace",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(2),
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bolder',
  width: "100%",
  textAlign: "center",
  wordWrap: "break-word",
  fontSize: 20,
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 'bolder',
  width: "100%",
  textAlign: "center",
  wordWrap: "break-word",
  fontSize: 20,
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  alignSelf: 'center',
  backgroundColor: 'goldenrod',
}));

const Watchlist = styled('div')(({ theme }) => ({
  fontSize: 15,
  textShadow: '0 0 5px black',
  flex: 1,
  height: "200px",
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
  scrollbarWidth: "thin", // For Firefox
  "&::-webkit-scrollbar": {
    width: "6px", // For Chrome, Safari, and Opera
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(155, 155, 155, 0.7)", // For Chrome, Safari, and Opera
  },
}));

const handleLogout = () => {
  auth.signOut().then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
};

const UserSidebar = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { user, watchlist, coins } = CryptoState();

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              width: 38,
              height: 38,
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
            src={user?.photoURL}
            alt={user?.displayName || user?.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <StyledContainer>
              <StyledAvatar
                src={user?.photoURL}
                alt={user?.displayName || user?.email}
              />
              <UserName variant="h6">{user?.displayName}</UserName>
              <UserEmail variant="body2">{user?.email}</UserEmail>

              <Watchlist>
                Watchlist
                {coins.map((coin) => {
                  if (watchlist.includes(coin.id)) {
                    return (
                      <div
                        sx={{
                          fontSize: 15,
                          textShadow: "0 0 5px black",
                          flex: 1,
                          height: "200px",
                          width: "100%",
                          backgroundColor: "grey",
                          borderRadius: 10,
                          padding: 15,
                          paddingTop: 10,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 12,
                          overflowY: "scroll",
                          scrollbarWidth: "thin",
                        }}
                        key={coin.id}
                      >
                        <span>{coin.name}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </Watchlist>
            </StyledContainer>
            
            <LogoutButton 
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </LogoutButton>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;
//! SIDEBAR FOR USER PROFILE
//? This is the sidebar for the user profile page. It will contain the user's information and allow them to edit it.
//? It will also contain the user's watchlist and allow them to edit or delete them.
//? It is made using the MUI Drawer component.

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Typography } from "@mui/material";
import { CryptoState } from "../../Pages/CryptoContext";
import { styled } from '@mui/system';

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

export default function UserSidebar() {
  
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

  const { user } = CryptoState();

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
            </StyledContainer>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
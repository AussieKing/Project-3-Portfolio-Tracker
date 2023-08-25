//! ### ALERT COMPONENT ###
//? This component is used to display the alert message when the user adds a coin to the watchlist or removes a coin from the watchlist.
//? The alert message is displayed for 2 seconds and then disappears.
//? The alert message is displayed at the top of the screen.
//? The alert message is displayed in a snackbar.

import React from "react";
import { CryptoState } from "../Pages/CryptoContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = () => {
  const { alert, setAlert } = CryptoState(); // import the alert state from the CryptoContext

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={alert.type}
        elevation={10}
        variant="filled"
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

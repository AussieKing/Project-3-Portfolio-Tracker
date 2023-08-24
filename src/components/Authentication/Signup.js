//! SIGNUP COMPONENT

import React from "react";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { CryptoState } from "../../Pages/CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = ({ handleClose }) => {
  // State for the form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { alert, setAlert } = CryptoState(); // import the setAlert function from the CryptoContext

  // handle submit function : check for password match (alert via MUI snackbar)
  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      setAlert({
        open: true,
        message: "Passwords don't match",
        type: "error",
      });
      return;
    }
    // Try catch crate new user via the firebase auth
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Sign Up successful! Welcome ${res.user.email}`,
        type: "success",
      });

      // after the login, close the modal
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        id="outlined-email"
        label="Enter email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        id="outlined-password"
        label="Enter Password"
        variant="outlined"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        id="outlined-confirm-password"
        label="Confirm Password"
        variant="outlined"
        value={passwordConfirmation}
        type="password"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "wheat" }}
        size="large"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;

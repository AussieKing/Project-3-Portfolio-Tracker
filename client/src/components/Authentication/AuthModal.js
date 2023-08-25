//! AUTHENTICATION MODAL COMPONENT

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import styled from "@emotion/styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GoogleContainer = styled(Box)(({ theme }) => ({}));

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Google Authentication Function from Firebase
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: 90, height: 40, backgroundColor: "goldenrod" }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open} timeout={500}>
          <Box
            sx={{
              ...style,
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "goldenrod",
              color: "black",
              bgcolor: "background.paper",
              borderRadius: 10,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
              style={{ borderRadius: 10 }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <GoogleContainer>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </GoogleContainer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

import React from 'react'
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { CryptoState } from '../../Pages/CryptoContext';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {

// states
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// import the setalert function from the CryptoState
const { alert, setAlert } = CryptoState();

// handle submit function
const handleSubmit = async() => {

  if (!email || !password) {
    setAlert({
      open: true,
      message: 'Please fill in all fields',
      type: 'error'
    });
    return;
  }

  // try catch login user via firebase auth
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    setAlert({
      open: true,
      message: `Login successful! Welcome ${res.user.email}`,
      type: 'success'
    });

    // after the login, close the modal
    handleClose();
  }
  catch (error) {
    setAlert({
      open: true,
      message: error.message,
      type: 'error'
    });
  }

}


  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap:'20px'}}>
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
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button 
        variant='contained'
        style={{ backgroundColor: 'wheat' }}
        size='large'
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login


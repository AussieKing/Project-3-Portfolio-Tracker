import React from 'react'
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Signup = ({handleClose}) => {

  // State for the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // handle submit function : check for password match (alert via MUI snackbar)
  const handleSubmit = () => {
    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return;
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
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        id="outlined-confirm-password"
        label="Confirm Password"
        variant="outlined"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        fullWidth
      />
      <Button 
        variant='contained'
        style={{ backgroundColor: 'wheat' }}
        size='large'
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
)
}

export default Signup
import React from 'react'
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

const Login = ({handleClose}) => {

// states
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// handle submit function
const handleSubmit = () => {
  console.log('submitting form');
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

export default Login


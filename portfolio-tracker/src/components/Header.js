import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Header = () => {
    const [currency, setCurrency] = useState('USD');  // Setting a default value to 'USD'

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
        },
            mode: 'dark',
        },
    });

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography onClick={() => navigate('/')}
                        sx={{
                            flex: 1,
                            color: 'goldenrod',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'Montserrat',
                        }}
                    >
                        Crypto Kings
                    </Typography>

                    <Select 
                        value={currency}
                        onChange={handleCurrencyChange}
                        variant='outlined'
                        sx={{
                            marginLeft: 1,  // Using MUI spacing units
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                    >
                        <MenuItem value='USD'>USD</MenuItem>
                        <MenuItem value='EUR'>EUR</MenuItem>
                        <MenuItem value='GBP'>GBP</MenuItem>
                        <MenuItem value='AUD'>AUD</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        <CssBaseline />
        </ThemeProvider>
    );
}

export default Header;

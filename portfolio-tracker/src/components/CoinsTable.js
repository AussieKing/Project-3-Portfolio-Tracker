import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../Pages/CryptoContext";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Container,
  createTheme,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const CoinsTable = () => {
  // Create states
  const [coins, setCoins] = useState([]); // state for the coins
  const [loading, setLoading] = useState(false); // state for the loading message
  const [search, setSearch] = useState(""); // state for the search bar

  // need the navigate prop to navigate from one page to another
  const navigate = useNavigate();

  // Get the currency from the CryptoState
  const { currency } = CryptoState();

  // Create a function to fetch the data from the API:
  // We receive data/currency from the API, and we destructure { } the data to get the coins
  const fetchCoins = async () => {
    setLoading(true); // Set loading to true so that we can display a loading message while the data is being fetched

    // use try catch to fetch the data from the API, and make sure to await the data (use async)
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data); // Set the data that we received from the API to the coins state
    } catch (error) {
      console.error("Error fetching coins:", error);
      // Optionally set some state to indicate the error to the user
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  console.log(coins); // Check the coins state in the console

  // Use useEffect to fetch the data from the API when the component mounts
  useEffect(() => {
    fetchCoins();
  }, [currency]); // Fetch the data again when the currency changes via the CryptoState

  // import the dark theme, same as in Header.js
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  // need to create a handle search function to filter the coins based on the search bar;
  // searching for a coin by name on the search bar and returning the coins that match the search with the symbol and name
  // filter the coins by name based on the search bar, and use the toUpperCase() and toLowerCase() methods to make the search case insensitive
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toUpperCase().includes(search.toUpperCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // create the styles for the table rows
  const StyledRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Monserrat" }}
        >
          Top 100 Cryptocurrencies by Market Cap
        </Typography>

        {/* Search bar */}
        <TextField
          label="Search for a Cryptocurrency"
          variant="outlined"
          style={{ width: "100%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)} // so that the search bar is updated as the user types in it
        />

        <TableContainer>
          {loading ? ( // If loading is true, display a loading component from Material UI
            <CircularProgress style={{ display: "flex" }}></CircularProgress>
          ) : (
            // if loading is false, display the table with the data
            <Table aria-label="simple table">
              {/* Header */}
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {/* Displaying the name, current price, 24h change, and market cap of the coins, then we map through the array of coins and display the data for each coin in a row of the table  */}
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head} // key is required when mapping through an array
                      align={head === "Coin" ? "" : "right"} // and align the data to the right leaving more space for the coin name
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Body */}
              <TableBody>
                {/* Map through the coins array and display the data for each coin in a row of the table */}
                {/* need to map through the handleSearch function to display the coins that match the search, otherwise it would display all the coins */}
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0; // if the price change is greater than 0, it is a profit
                  // and render the data in the table
                  return (
                    <StyledRow
                      onClick={() => navigate(`/coins/${row.id}`)} // when the user clicks on a row, navigate to the coin details page by using the useHistory hook and the coin id
                      key={row.name} // key is required when mapping through an array
                    >
                      <TableCell
                        component="th"
                        scope="row" // th for table header and the purpose is row
                        style={{
                          display: "flex",
                          gap: 15,
                          fontFamily: "Montserrat",
                        }}
                      >
                        {row.name} {/* display the name of the coin */}
                      </TableCell>
                      <TableCell align="right">{row.current_price}</TableCell>  {/* display the current price of the coin */}
                      <TableCell
                        align="right"
                        style={{ color: profit ? "green" : "red" }}  // if the price change is greater than 0, it is a profit in green, otherwise it is a loss in red
                      >
                        {row.price_change_percentage_24h.toFixed(2)}%  {/* display the % change in the last 24 hours, displaying 2 decimals */}
                      </TableCell>
                      <TableCell align="right">{row.market_cap}</TableCell>  {/* display the market cap of the coin */}
                    </StyledRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

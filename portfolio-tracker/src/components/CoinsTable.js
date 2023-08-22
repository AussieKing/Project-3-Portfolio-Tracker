import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../Pages/CryptoContext";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Container,
  createTheme,
  Pagination,
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
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  // Create states for the coins, loading, search, navigation and page
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // set the page to 1

  const navigate = useNavigate(); // need the navigate prop to navigate from one page to another
  const { currency } = CryptoState(); // Get the currency from the CryptoState hook

  // Create a function to fetch the data from the API:
  // We receive data/currency from the API, and we destructure { } the data to get the coins
  // Use useEffect to fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchCoins = async () => {
      // calling the fetchCoins function inside the useEffect hook

      setLoading(true); // Set loading to true so that we can display a loading message while the data is being fetched
      // use try catch to fetch the data from the API, and make sure to await the data (using async above)
      try {
        const { data } = await axios.get(CoinList(currency));
        setCoins(data); // Set the data that we received from the API to the coins state
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        // once the data is fetched, set loading to false
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency]);

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
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  // create a styled row to display the coins in the table
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

        <TextField
          label="Search for a Cryptocurrency"
          variant="outlined"
          style={{ width: "100%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <CircularProgress style={{ display: "flex" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
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

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 20, (page - 1) * 20 + 20) // slice the coins to display 20 coins per page
                  .map((row) => {
                    // map through the coins to display the data in the table
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <StyledRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            gap: "15px",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            sx={{ marginBottom: "10px" }}
                          />
                          <div
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "22px",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <br />
                            <span sx={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 500 }}>
                          {Symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: profit ? "green" : "red" }}
                        >
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {row.market_cap.toString().slice(0, -6)}M
                        </TableCell>
                      </StyledRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={Math.ceil(handleSearch().length / 10)}  // count the number of pages based on the number of coins and the number of coins per page, and use Math.ceil to round up, so that we don't have a decimal number of pages
          sx={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            ul: {  
              listStyle: "none",
              padding: 0,
            },
          }}
          onChange={(_, value) => {  // onChange function to change the page
            setPage(value);  // set the page to the value
            window.scroll(0, 450);  // scroll to the top of the page when the page changes (450px)
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

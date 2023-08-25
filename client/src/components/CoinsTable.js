import React, { useEffect, useState, useMemo } from "react";
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
  ThemeProvider,
} from "@mui/material";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {

  // const { Symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { Symbol, currency } = CryptoState();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  const StyledRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
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
            <CircularProgress style={{ display: "block", margin: "0 auto" }} />
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
                {filteredCoins
                  .slice((page - 1) * 20, (page - 1) * 20 + 20)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <StyledRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ 
                            display: "flex",
                            gap: "15px",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: "10px" }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
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
                            <span style={{ color: "darkgrey" }}>{row.name}</span>
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
          count={Math.ceil(filteredCoins.length / 10)}
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
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

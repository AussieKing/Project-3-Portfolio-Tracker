import { Button, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import parse from "html-react-parser"; // gets rid of the html tags in the description of the data returned from the API
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/Banner/Carousel";
import { CryptoState } from "./CryptoContext";

const CoinContainer = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const CoinSidebar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const CoinHeading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
}));

const CoinDescription = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
}));

const CoinMarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    // for medium screens and below
    display: "flex", // display the data in a row and flex
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    // for small screens and below
    flexDirection: "column", // display the data in a column
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    // for extra small screens and below
    alignItems: "start", // align the data to the start
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <CoinContainer>
      <CoinSidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <CoinHeading variant="h3">{coin?.name}</CoinHeading>
        <CoinDescription variant="subtitle1">
          {parse(coin?.description.en.split(". ")[0])}{" "}
          {/* parse the description (in english) of the coin to get rid of the html tags */}
        </CoinDescription>
        <CoinMarketData>
          <span style={{ display: "flex" }}>
            <CoinHeading variant="h5">Rank:</CoinHeading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <CoinHeading variant="h5">Current Price:</CoinHeading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <CoinHeading variant="h5">Market Cap:</CoinHeading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
          {user && (
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  width: "100%",
                  height: 40,
                  backgroundColor: "goldenrod",
                  color: "black",
                  ":hover": {
                    backgroundColor: "gold",
                  },
                }}
              >
                Add to Watchlist
              </Button>
            )}
          </span>
        </CoinMarketData>
      </CoinSidebar>

      {/* chart */}
      <CoinInfo coin={coin} />
    </CoinContainer>
  );
};

export default CoinPage;

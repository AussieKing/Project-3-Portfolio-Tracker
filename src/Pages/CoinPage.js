//! COINPAGE
//? This page is the page that is rendered when a user clicks on a coin from the home page. It displays the coin's name, image, description, and price. It also allows the user to add the coin to their watchlist.
//? It is made using the MUI Grid component.

import React, { useEffect, useState } from "react";
import { Button, LinearProgress, Typography, styled } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/Banner/Carousel";
import { CryptoState } from "./CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
}));

const CoinSidebar = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const isCoinInWatchlist = watchlist.includes(coin?.id);

  const toggleWatchlist = async () => {
    if (!user) return;

    const updatedWatchlist = isCoinInWatchlist
      ? watchlist.filter(itemId => itemId !== coin.id)
      : [...watchlist, coin.id];

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, { coins: updatedWatchlist });

      setAlert({
        open: true,
        message: isCoinInWatchlist
          ? `${coin.name} removed from watchlist!`
          : `${coin.name} added to watchlist!`,
        type: "success",
      });
    } catch (error) {
      console.log("Error updating watchlist:", error);
    }
  };

  return (
    <CoinContainer>
      <CoinSidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1">
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div>
          <span style={{ display: "flex" }}>
            {user && (
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  width: "100%",
                  height: 40,
                  backgroundColor: isCoinInWatchlist ? "red" : "goldenrod",
                  color: "black",
                  ":hover": {
                    backgroundColor: isCoinInWatchlist ? "red" : "gold",
                  },
                }}
                onClick={toggleWatchlist}
              >
                {isCoinInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            )}
          </span>
        </div>
      </CoinSidebar>
      <CoinInfo coin={coin} />
    </CoinContainer>
  ); 
};

export default CoinPage;

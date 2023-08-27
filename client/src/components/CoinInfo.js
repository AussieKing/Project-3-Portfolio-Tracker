//! COININFO
//? This component is responsible for displaying the chart of the coin, and the buttons to change the time frame of the chart.

import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
// import { Line } from "react-chartjs-2";  //TODO: use this to reintroduce the chart at a later date
import { CircularProgress, Typography, ThemeProvider } from "@mui/material";
import { styled, createTheme } from "@mui/material/styles";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../Pages/CryptoContext";

const CoinContainer = styled("div")(({ theme }) => ({
  width: "75%", // width of the container.
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    // when the screen is medium size, the width of the container becomes 100%.
    width: "100%",
    marginTop: 0, // no need for margin or padding on smaller screens
    padding: 20,
    paddingTop: 0,
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(); // state to store the historical data of the coin.
  const [days, setDays] = useState(1); // display price action for the last 24 hours by default.
  const { currency } = CryptoState(); // get the currency from the context API
  const [flag, setFlag] = useState(false); // flag to check if the data is fetched or not.

  const fetchHistoricData = async () => {
    //!Loggin the request URL for debugging purposes
    console.log(HistoricalChart(coin.id, days, currency));
    console.log("Coin ID:", coin.id);
    console.log("Days:", days);
    console.log("Currency:", currency);
    // 

    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
      console.log("API response:", response);

      if (response && response.data && response.data.prices) {
        setHistoricData(response.data.prices);
        setFlag(true);
      } else {
        console.error("Expected data structure not found:", response);
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    // ... original render remains unchanged
    <ThemeProvider theme={darkTheme}>
      <CoinContainer>
        {!historicData || flag === false ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            {/* TODO: MAYBE reintroducing the Chart component here at a later date */}
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map(
                (day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setFlag(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                )
              )}
            </div>
          </>
        )}
      </CoinContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;


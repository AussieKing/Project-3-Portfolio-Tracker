import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
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
    // function to fetch the historical data of the coin, using the HistoricalChart API.
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency)); // get the data from the API (using axios), display the did, days and currency.
    setFlag(true);
    setHistoricData(data.prices); // we just want the prices from the data, so we set the state to data.prices.
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]); // we want to fetch the data whenever the days change.

  return (
    // importing the dark theme from MUI and wrapping the component in the ThemeProvider.
    <ThemeProvider theme={darkTheme}>
      <CoinContainer>
        {!historicData || flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          // if the data is not fetched, display a circular progress ba, otherwise display the chart.
          <>

{/* ISSUE FROM HERE */}

            {/* Chart */}
            {/* <Line
              data={{
                labels: historicData.map((coin) => {  // map through the historic data and return the date and time of the coin.
                  let date = new Date(coin[0]);  // the date is in UNIX format, so we convert it to a readable format (the 0 index is the date, the 1 index is the price)
                  let time =  // vanilla JS to convert the time to AM/PM format.
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();  // datasets below
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),  // take price (index 1) from the historic data, and map through it.
                    label: `Price ( Past ${days} Days ) in ${currency}`,   // labels in the past ${days} days in ${currency}
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{  // to remove the legend, and to make the chart responsive, and get rid of the gridlines.
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            /> */}

{/* ISSUE TO HERE */}

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map(
                (
                  day // map through the chartDays array and return the days. File is in config/data.js, to make it easier to change the days.
                ) => (
                  <SelectButton
                    key={day.value} // key is the value of the day.
                    onClick={() => {
                      // and when the button is clicked, set the days to the value of the day, and set the flag to false.
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

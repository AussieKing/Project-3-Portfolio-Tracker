import axios from 'axios';
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";  // carousel npm package
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../Pages/CryptoContext";
import { Box } from "@mui/system";
import { styled } from '@mui/system';  // to style the Link component
import { Link as RouterLink } from 'react-router-dom';

// function to add price to the carousel coins, via a RegEx (thanks google!)
export const numberWithCommas = (number) => {  // pass on the number as a parameter
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  // and return the number with a comma via the RegEx
}; // export it so we can use it in other components

// Create a styled version of the Link component
const StyledLink = styled(RouterLink)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  textDecoration: "none",
}));

const Carousel = () => {  // creating the carousel component with the useState hook and the CryptoState hook
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {  // function to fetch the trending coins, async as we are fetching data from an API (using await)
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrending(data);
  };

  useEffect(() => {  // useEffect to run whatever is rendered inside the component, and ES Lint to ignore the dependency! (was returning an error without it)
    fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {  // map through the trending coins from the state
    let profit = coin?.price_change_percentage_24h >= 0;  // if the price change is greater than 0, it is a profit

    return (   // link to navigate from one page to another
      <StyledLink to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}   // image of the coin
          alt={coin.name}
          height="80"
          sx={{ marginBottom: 10 }}
        />
        {/* display the name of the coin, and its % gains/loss as well as if it's a gainer */}
        <span>
          {coin?.symbol}
          &nbsp; 
          <Box
            component="span"  // component span to display the % change in the last 24 hours
            sx={{
              color: profit > 0 ? "green" : "red",
              fontSize: 20,
              fontWeight: 500
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}% 
          </Box>
        </span>

        {/* display the current price of the coin */}
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </StyledLink>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (  // return the carousel component
    <div
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;

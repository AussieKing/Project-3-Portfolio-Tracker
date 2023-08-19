import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    // TODO: image not rendering -------------------------
    <div
      sx={{
        backgroundImage: "url(/banner.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "400px",
        width: "100%",
        backgroundColor: "red",
      }}
    >
      <Container
        sx={{
          // container styling
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingTop: 25,
        }}
      >
        <div
          sx={{
            // tagline styling
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2" // font styling
            sx={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat", // fixed the property name
            }}
          >
            Crypto Kings
          </Typography>
          <Typography
            variant="subtitle2" // font styling for subtitle
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat", // fixed the property name
            }}
          >
            Keep up to date with the latest crypto price action
          </Typography>
        </div>
{/* UP TO HERE: Carousel component  */}
        <Carousel />  
      </Container>
    </div>
  );
};

export default Banner;

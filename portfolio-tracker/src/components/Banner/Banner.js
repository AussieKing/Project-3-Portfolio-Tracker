import React from "react";
import { Container, Typography } from "@mui/material";

const Banner = () => {
  return (
    <div
      sx={{  //! TODO : import of image not working
        backgroundImage: "url(./images/banner.jpg)",
      }}
    >
      <Container
        sx={{  // container styling
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingTop: 25,
        }}
      >
        <div
          sx={{  // tagline styling
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"  // font styling
            sx={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat", // fixed the property name
            }}
          >
            Crypto Kings
          </Typography>
          <Typography
            variant="subtitle2"  // font styling for subtitle
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat", // fixed the property name
            }}
          >
            Keep up to date with the latest crypto price action
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Banner;

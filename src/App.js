//! App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/HomePage";
import Coinpage from "./Pages/CoinPage";
import { StyledEngineProvider } from "@mui/material/styles"; 
import { styled } from "@mui/material/styles";
import Alert from "./components/Alert";

const AppContainer = styled('div')({
  backgroundColor: "#14161a",
  color: "#fff",
  height: "100vh",
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </AppContainer>
        <Alert />
      </Router>
    </StyledEngineProvider>
  );
}

export default App;

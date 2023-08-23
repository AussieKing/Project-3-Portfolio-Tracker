import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from './CryptoContext';
import { CircularProgress } from "@mui/material"; // For loading state


// use useParam to get the id of the coin from the URL
const CoinPage = () => {

  const { id } = useParams();
  const [coinData, setCoinData] = useState(null); //create the state to store what we get from the API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state


  // bring in the currency and symbol from the CryptoState hook
  const { currency, symbol } = CryptoState();

  // create a function to fetch the data from the API
  const fetchCoinData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoinData(data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  console.log(coinData);

  // use useEffect to fetch the data from the API when the component mounts
  useEffect(() => {
    fetchCoinData();
  }, [id]);

  if (loading) return <CircularProgress />;  // Show a loader when fetching
  if (error) return <div>Error: {error}</div>; // Show error message



  return (
    <div>
      CoinPage for {coinData.name}
    </div>
  )
}

export default CoinPage;
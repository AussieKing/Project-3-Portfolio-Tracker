import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CryptoState } from '../Pages/CryptoContext';
import { CoinList } from '../config/api';

const CoinsTable = () => {
    // Create 2 states
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { currency } = CryptoState(); // Get the currency from the CryptoState

    // Create a function to fetch the data from the API: 
    // We receive data/currency from the API, and we destructure { } the data to get the coins
    const fetchCoins = async () => {
        setLoading(true); // Set loading to true so that we can display a loading message while the data is being fetched
        
        try {
            const { data } = await axios.get(CoinList(currency));
            setCoins(data); // Set the data that we received from the API to the coins state
        } catch (error) {
            console.error("Error fetching coins:", error);
            // Optionally set some state to indicate the error to the user
        } finally {
            setLoading(false); // Set loading to false once the data is fetched
        }
    };

    console.log(coins); // Check the coins state in the console

    // Use useEffect to fetch the data from the API when the component mounts
    useEffect(() => {
        fetchCoins();
    }, [currency]); // Fetch the data again when the currency changes via the CryptoState

    return (
        <div>
            {loading ? "Loading..." : "CoinsTable"}
        </div>
    );
}

export default CoinsTable;

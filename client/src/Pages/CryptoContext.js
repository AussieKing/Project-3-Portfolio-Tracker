//! CRYPTO CONTEXT PAGE

import { onAuthStateChanged } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  // create the state and the functions to update the state for the currency and the symbols
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState("$");
  //TODO : new states for the coins and the loading
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({open: false, message: '', type: 'success'});  // state for the alert snack bar 

  useEffect(() => {  // monitor the auth state of the firebase auth
    onAuthStateChanged(auth, user => {
      if (user) {  // if the user exists
        setUser(user);  // set the user state to the user
      }
      else {  // otherwise, set the user state to null
        setUser(null);
      }
    }
      )  // takes the auth and gives a callback function
}, [])

//! NEW fetchCoins function

const fetchCoins = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=${currency}&days=1`
    );
    const data = await response.json();
    setCoins(data);
  } catch (error) {
    console.error("Error fetching the coin data:", error);
    setAlert({
      open: true,
      message: "Error fetching coin data",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCoins(); // Call the function when the component mounts or currency changes
}, [currency]);

useEffect(() => {
  if (currency === "USD") setSymbol("$");
  else if (currency === "EUR") setSymbol("€");
  else if (currency === "GBP") setSymbol("£");
  else if (currency === "AUD") setSymbol("A$");
}, [currency]);

return (
  <Crypto.Provider
    value={{
      currency,
      symbol,
      setCurrency,
      coins,
      loading,
      alert,
      setAlert,
      user,
    }}
  >
    {children}
  </Crypto.Provider>
);
};

export default CryptoContext;
export const CryptoState = () => {
return useContext(Crypto);
};

//   useEffect(() => {  // useEffect to run whatever is rendered inside the component
  
//   if (currency === 'USD') setSymbol('$');
//     else if (currency === 'EUR') setSymbol('€');
//     else if (currency === 'GBP') setSymbol('£');
//     else if (currency === 'AUD') setSymbol('A$');
//   }, [currency]);  // adding the currency as a dependency

//   return (  // wrapping the whole app in the Crypto context provider
//   <Crypto.Provider value={{
//     currency, 
//     symbol, 
//     setCurrency, 
//     coins, 
//     loading, 
//     alert, 
//     setAlert,
//     user,
//     }}
//   >
//     {children}
//   </Crypto.Provider>
//   )
// }

// export default CryptoContext;
// export const CryptoState = () => {   // custom hook to get the state, create a new file called CryptoState.js
//   return useContext(Crypto); 
// }

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

  useEffect(() => {  // useEffect to run whatever is rendered inside the component
  
  //! POTENTIAL ERROR HERE: do I need to add the fetchCoins function here???
  if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    else if (currency === 'GBP') setSymbol('£');
    else if (currency === 'AUD') setSymbol('A$');
  }, [currency]);  // adding the currency as a dependency

  return (  // wrapping the whole app in the Crypto context provider
  <Crypto.Provider value={{
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
  )
}

export default CryptoContext;
export const CryptoState = () => {   // custom hook to get the state, create a new file called CryptoState.js
  return useContext(Crypto); 
}

import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  // create the state and the functions to update the state for the currency and the symbols
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState("$");

useEffect(() => {  // useEffect to run whatever is rendered inside the component

  if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    else if (currency === 'GBP') setSymbol('£');
    else if (currency === 'AUD') setSymbol('A$');
  }, [currency]);  // adding the currency as a dependency

  return (  // wrapping the whole app in the Crypto context provider
  <Crypto.Provider value={{currency, symbol, setCurrency}}>
    {children}
  </Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState = () => {   // custom hook to get the state, create a new file called CryptoState.js
  return useContext(Crypto); 
}
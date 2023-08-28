//! CRYPTOCONTEXT
//? This is the context provider for the entire app. It provides the following:
//? - The user's currency preference
//? - The user's watchlist
//? - The user's authentication status
//? - The user's alert status
//? - The user's watchlist

import { onAuthStateChanged } from '@firebase/auth';
import { onSnapshot, doc } from '@firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', type: 'success' });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user.uid);
      const unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log('No items in the watchlist');
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    else if (currency === 'GBP') setSymbol('£');
    else if (currency === 'AUD') setSymbol('A$');
  }, [currency]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

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
        watchlist,
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

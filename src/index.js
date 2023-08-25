import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoContext from './Pages/CryptoContext';
import "react-alice-carousel/lib/alice-carousel.css";
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo'; // Make sure this path is correct to where you've placed apollo.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CryptoContext>
          <App />
      </CryptoContext>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

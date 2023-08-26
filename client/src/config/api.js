const PROXY_URL = `${process.env.REACT_APP_PROXY_BASE_URL}/proxy?url=`;

// Coingecko APIs for price Action.

export const CoinList = (currency) => 
  `${PROXY_URL}https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) => 
  `${PROXY_URL}https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${PROXY_URL}https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) => 
  `${PROXY_URL}https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

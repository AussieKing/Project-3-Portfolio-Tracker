// Coingecko APIs for price Action.

// This API is used to get the list of all the coins: it takes the ${currency} as a parameter and returns the top 100 coins in descending order of market cap.
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  // This API provides the details of a single coin: it takes the ${id} of the coin as a parameter and returns the details of that coin.
export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

  // This API takes the id of the coin as a parameter and returns the historical price action of that coin in the last 365 days.
export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// The following API is used to get the trending coins: it takes the ${currency} as a parameter and returns the top 10 trending coins in the last 24 hours.
export const TrendingCoins = (currency) =>  // endpoint for trending coins : TrendingCoins
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
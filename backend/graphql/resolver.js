//! RESOLVERS

const Watchlist = require('../models/Watchlist');

module.exports = {
  addToWatchlist: async ({ userId, coin }) => {
    try {
      let watchlist = await Watchlist.findOne({ userId });

      if (!watchlist) {
        watchlist = new Watchlist({ userId, coins: [coin] });
      } else {
        watchlist.coins.push(coin);
      }

      await watchlist.save();

      return watchlist;
    } catch (error) {
      throw new Error("Failed to add to watchlist.");
    }
  },

  removeFromWatchlist: async ({ userId, coinId }) => {
    try {
      const watchlist = await Watchlist.findOne({ userId });

      if (!watchlist) {
        throw new Error("Watchlist not found.");
      }

      // Remove the coin from the array
      watchlist.coins = watchlist.coins.filter(coin => coin.coinId !== coinId);

      await watchlist.save();

      return watchlist;
    } catch (error) {
      throw new Error("Failed to remove from watchlist.");
    }
  },

  getWatchlist: async ({ userId }) => {
    try {
      const watchlist = await Watchlist.findOne({ userId });
      if (!watchlist) {
        throw new Error('Watchlist not found for this user.');
      }
      return watchlist;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
